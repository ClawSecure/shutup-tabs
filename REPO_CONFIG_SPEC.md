# ClawSecure Public GitHub Repo -- Configuration Spec
## Repository: ClawSecure/shutup-tabs

### Repository Name
`shutup-tabs`

### Repository Description (About)
Character limit: Keep under 130 characters for optimal meta description rendering.

**Description:**
```
Stop Claude Code from opening tabs. Auto-close diff tabs in VS Code, Cursor, Windsurf.
```
(89 characters)

**Note:** GitHub generates the title tag as `GitHub - ClawSecure/shutup-tabs: [description]`. Research shows shorter, keyword-dense descriptions outperform longer ones in GitHub search. This description front-loads the exact long-tail query "stop claude code from opening tabs" which is what developers actually type. The brand ("ClawSecure") appears in the org name before any truncation.

### Website URL
```
https://www.clawsecure.ai
```

### Repository Topics (15 of 20 slots used)

All topics must be lowercase, hyphens only, 50 chars max per GitHub rules.
Research finding: 8-12 focused topics outperform 20 diluted ones, but every compatible editor name is worth including because they are high-intent, low-competition exact-match terms.

**Tier 1 -- Primary keywords (highest search volume):**
1. `claude-code`
2. `vscode-extension`
3. `auto-close-tabs`
4. `claude-code-tabs`
5. `claude-code-extension`

**Tier 2 -- Ecosystem/editor keywords (all compatible editors):**
6. `cursor`
7. `windsurf`
8. `antigravity`
9. `google-antigravity`
10. `roo-code`
11. `cline`
12. `kilo-code`
13. `vibe-coding`

**Tier 3 -- Category keywords:**
14. `ai-coding-assistant`
15. `developer-productivity`

### Social Preview Image
- **Dimensions:** 1280 x 640 px
- **Filename:** `shutup-tabs-social-preview.png`
- **Content suggestion:** ClawSecure mascot/logo + "ShutUp Tabs" title + "Auto-close Claude Code diff tabs" tagline + "Free by ClawSecure" + clawsecure.ai URL + VS Code/Cursor/Windsurf/Antigravity editor logos or icons
- **Note:** Route to Graphics Chat for production. Use SOCIAL mode (2-3x text size for thumbnail readability).

### Visibility
Public

### License
MIT (most recognized license on GitHub at 38%; native license picker support; developer-familiar; covers docs + code examples)

### Default Branch
`main`

### Features to Enable
- [x] Issues (enabled -- for bug reports and feature requests)
- [ ] Wiki (disabled -- docs live in README)
- [ ] Discussions (disabled for now -- can enable later for community)
- [ ] Projects (disabled)
- [ ] Sponsorships (disabled)

### Files in Repo

```
shutup-tabs/
├── README.md                              # Project README and documentation
├── CONTRIBUTING.md                        # Contribution guidelines
├── LICENSE                                # MIT License
├── package.json                           # Extension manifest
├── tsconfig.json                          # TypeScript config
├── .vscodeignore                          # VSIX packaging exclusions
├── .gitignore                             # Git exclusions
├── src/
│   └── extension.ts                       # Core extension logic
├── out/
│   └── extension.js                       # Compiled output
├── images/
│   ├── icon.png                           # Extension icon (128x128, placeholder)
│   └── shutup-tabs-hero-banner.png        # README hero banner (1280x400, from Graphics Chat)
├── .vscode/
│   └── launch.json                        # F5 debug config
└── .github/
    └── ISSUE_TEMPLATE/
        ├── bug_report.md                  # Bug report template
        └── feature_request.md             # Feature request template
```

### Post-Setup Checklist
1. [ ] Create repo `shutup-tabs` on GitHub (github.com/organizations/ClawSecure/repositories/new)
2. [ ] Set description and website URL in About section
3. [x] Add all 15 topics (done via gh CLI)
4. [ ] Push all files from local repo (`git push -u origin main`)
5. [ ] LICENSE already exists (MIT, committed locally)
6. [ ] Upload Social Preview image (route to Graphics Chat first)
7. [ ] **Graphics Chat:** Create social preview (1280x640) -- upload via GitHub Settings > General > Social Preview
8. [ ] **Graphics Chat:** Create extension icon (256x256) -- replace `images/icon.png`, rebuild .vsix
9. [ ] **Graphics Chat:** Create hero banner (1280x400) -- save as `images/shutup-tabs-hero-banner.png`
10. [ ] Remove hero banner placeholder comment from README once image is added
11. [ ] Verify repo appears in GitHub search for "claude code tabs" within 1-2 weeks
12. [ ] Verify repo appears in Google Search Console within 2-4 weeks
