import * as vscode from 'vscode';

/** Tracks how many tabs we've auto-closed this session */
let closedTabCount = 0;

/** Timestamp of the last Claude Code diff tab we saw open */
let lastClaudeDiffTimestamp = 0;

/** The tab that was active before Claude opened something */
let previousActiveTab: vscode.Tab | undefined;

/** Set of tab labels that existed before the extension activated (user-opened tabs) */
const preExistingTabLabels = new Set<string>();

/** Status bar item for toggle display */
let statusBarItem: vscode.StatusBarItem;

/** Disposables for cleanup */
const disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
    // Snapshot all currently open tabs so we never close user-opened ones
    snapshotExistingTabs();

    // Create status bar item (left side, high priority)
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        100
    );
    statusBarItem.command = 'shutupTabs.toggle';
    updateStatusBar();
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('shutupTabs.toggle', toggleEnabled),
        vscode.commands.registerCommand('shutupTabs.closeAllClaudeTabs', closeAllClaudeTabsNow),
        vscode.commands.registerCommand('shutupTabs.showStats', showStats)
    );

    // Watch for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('shutupTabs.enabled')) {
                updateStatusBar();
            }
        })
    );

    // Watch for new tabs
    const tabChangeDisposable = vscode.window.tabGroups.onDidChangeTabs((event) => {
        if (!getConfig<boolean>('enabled')) {
            return;
        }

        // Track what was active before Claude's tabs arrive
        const currentActive = vscode.window.tabGroups.activeTabGroup.activeTab;
        if (currentActive && !isClaudeTab(currentActive)) {
            previousActiveTab = currentActive;
        }

        for (const tab of event.opened) {
            handleNewTab(tab);
        }
    });

    context.subscriptions.push(tabChangeDisposable);
    disposables.push(tabChangeDisposable);
}

export function deactivate() {
    for (const d of disposables) {
        d.dispose();
    }
    disposables.length = 0;
}

// ─── Tab Detection ───────────────────────────────────────────────────────────

function isClaudeDiffTab(tab: vscode.Tab): boolean {
    // [Claude Code] label pattern
    if (tab.label.includes('[Claude Code]')) {
        return true;
    }

    // TabInputTextDiff opened by Claude Code (diff view)
    if (tab.input instanceof vscode.TabInputTextDiff) {
        // Claude's diffs typically have "[Claude Code]" in the label,
        // but also check for the diff pattern itself
        if (tab.label.includes('[Claude Code]')) {
            return true;
        }
    }

    return false;
}

function isClaudeCompanionFileTab(tab: vscode.Tab): boolean {
    if (!getConfig<boolean>('closeFileTabs')) {
        return false;
    }

    // Regular file tab that opened within 1s of a Claude diff tab
    if (tab.input instanceof vscode.TabInputText) {
        const now = Date.now();
        if (now - lastClaudeDiffTimestamp < 1000) {
            return true;
        }
    }

    return false;
}

function isClaudeTab(tab: vscode.Tab): boolean {
    return isClaudeDiffTab(tab) || isClaudeCompanionFileTab(tab);
}

function shouldSkipTab(tab: vscode.Tab): boolean {
    // Never close pinned tabs
    if (tab.isPinned) {
        return true;
    }

    // Never close tabs that existed before extension activated
    if (preExistingTabLabels.has(tab.label)) {
        return true;
    }

    // Never close the Claude Code chat panel itself
    // (it typically uses a webview, not a text/diff input)
    if (tab.input instanceof vscode.TabInputWebview) {
        return true;
    }

    return false;
}

// ─── Tab Handling ────────────────────────────────────────────────────────────

function handleNewTab(tab: vscode.Tab) {
    if (shouldSkipTab(tab)) {
        return;
    }

    const isDiff = isClaudeDiffTab(tab);
    const isCompanion = isClaudeCompanionFileTab(tab);

    if (isDiff && getConfig<boolean>('closeDiffTabs')) {
        lastClaudeDiffTimestamp = Date.now();
        scheduleClose(tab, 'diff');
    } else if (isDiff) {
        // Still record the timestamp even if we're not closing diffs,
        // so companion detection works
        lastClaudeDiffTimestamp = Date.now();
    } else if (isCompanion) {
        scheduleClose(tab, 'companion');
    }
}

function scheduleClose(tab: vscode.Tab, type: 'diff' | 'companion') {
    const delay = getConfig<number>('closeDelay');

    setTimeout(async () => {
        // Re-check the tab still exists and hasn't been pinned
        const currentTab = findTabByLabel(tab.label);
        if (!currentTab || currentTab.isPinned) {
            return;
        }

        // Don't close if the user has made it the active tab and is
        // actively looking at it (they may want to keep it)
        // Exception: if it JUST opened (within the delay window), close it
        // because that's the auto-focus steal we're fighting
        try {
            await closeTab(currentTab);
            closedTabCount++;

            if (getConfig<boolean>('showNotifications')) {
                vscode.window.showInformationMessage(
                    `ShutUp Tabs: Closed ${type} tab "${tab.label}"`
                );
            }

            // Restore focus to previous tab
            restoreFocus();
        } catch {
            // Tab may have already been closed by the user
        }
    }, delay);
}

async function closeTab(tab: vscode.Tab): Promise<void> {
    // Use the tabGroups API to close the tab
    await vscode.window.tabGroups.close(tab);
}

function restoreFocus() {
    if (!previousActiveTab) {
        return;
    }

    // Find the tab in current tab groups
    const target = findTabByLabel(previousActiveTab.label);
    if (!target) {
        return;
    }

    // Open the document to restore focus
    if (target.input instanceof vscode.TabInputText) {
        vscode.window.showTextDocument(target.input.uri, { preview: false, preserveFocus: false });
    } else if (target.input instanceof vscode.TabInputTextDiff) {
        vscode.window.showTextDocument(target.input.modified, { preview: false, preserveFocus: false });
    }
}

// ─── Commands ────────────────────────────────────────────────────────────────

function toggleEnabled() {
    const config = vscode.workspace.getConfiguration('shutupTabs');
    const current = config.get<boolean>('enabled', true);
    config.update('enabled', !current, vscode.ConfigurationTarget.Global);
    updateStatusBar(!current);

    vscode.window.showInformationMessage(
        `ShutUp Tabs: ${!current ? 'ON' : 'OFF'}`
    );
}

async function closeAllClaudeTabsNow() {
    let closed = 0;

    for (const group of vscode.window.tabGroups.all) {
        for (const tab of group.tabs) {
            if (tab.isPinned) {
                continue;
            }
            if (isClaudeDiffTab(tab)) {
                try {
                    await closeTab(tab);
                    closed++;
                } catch {
                    // Tab may have been closed already
                }
            }
        }
    }

    vscode.window.showInformationMessage(
        `ShutUp Tabs: Closed ${closed} Claude Code tab${closed !== 1 ? 's' : ''}`
    );
    closedTabCount += closed;
}

function showStats() {
    vscode.window.showInformationMessage(
        `ShutUp Tabs: ${closedTabCount} tab${closedTabCount !== 1 ? 's' : ''} auto-closed this session`
    );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getConfig<T>(key: string): T {
    return vscode.workspace.getConfiguration('shutupTabs').get<T>(key) as T;
}

function updateStatusBar(enabled?: boolean) {
    const isEnabled = enabled ?? getConfig<boolean>('enabled');
    if (isEnabled) {
        statusBarItem.text = '$(megaphone) ShutUp: ON';
        statusBarItem.tooltip = 'ShutUp Tabs by ClawSecure — clawsecure.ai\nClick to disable.';
        statusBarItem.backgroundColor = undefined;
    } else {
        statusBarItem.text = '$(unmute) ShutUp: OFF';
        statusBarItem.tooltip = 'ShutUp Tabs by ClawSecure — clawsecure.ai\nClick to enable.';
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
}

function snapshotExistingTabs() {
    for (const group of vscode.window.tabGroups.all) {
        for (const tab of group.tabs) {
            preExistingTabLabels.add(tab.label);
        }
    }
}

function findTabByLabel(label: string): vscode.Tab | undefined {
    for (const group of vscode.window.tabGroups.all) {
        for (const tab of group.tabs) {
            if (tab.label === label) {
                return tab;
            }
        }
    }
    return undefined;
}
