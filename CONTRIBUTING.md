# Contributing to ShutUp Tabs

Thank you for your interest in contributing to ShutUp Tabs by ClawSecure. This document provides guidelines for contributing to this project.

## Reporting Bugs

If ShutUp Tabs is not closing tabs correctly, or if it is closing tabs it should not, please open a bug report using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

Include the following information:
- Your editor and version (VS Code, Cursor, Windsurf, Antigravity, etc.)
- ShutUp Tabs version
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Your `shutupTabs` settings (from VS Code Settings JSON)

## Requesting Features

Have an idea for improving ShutUp Tabs? Open a feature request using the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## Submitting Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes in `src/extension.ts`
4. Compile with `npm run build` and verify no TypeScript errors
5. Test locally by pressing F5 to launch the Extension Development Host
6. Submit a pull request with a clear description of the change

## Development Setup

```bash
git clone https://github.com/ClawSecure/shutup-tabs.git
cd shutup-tabs
npm install
npm run build
```

Press F5 in VS Code to launch the Extension Development Host for testing.

## Code Style

- TypeScript strict mode
- No external runtime dependencies (only VS Code API)
- Comments for non-obvious logic only

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

ShutUp Tabs is maintained by [ClawSecure](https://www.clawsecure.ai).
