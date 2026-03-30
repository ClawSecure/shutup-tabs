# GRAPHICS BRIEF -- ShutUp Tabs GitHub Repo & Extension Images
**Date:** March 29, 2026
**Destination:** `ClawSecure/shutup-tabs` public GitHub repo + VS Code Marketplace
**Handoff to:** Graphics Chat
**Priority:** High -- repo needs professional visuals before marketing push

---

## CONTEXT

ShutUp Tabs is ClawSecure's free VS Code extension that auto-closes the diff tabs Claude Code force-opens. The extension is built and packaged. The GitHub repo needs 3 graphics: a social preview, an extension icon, and a README hero banner.

**All 3 graphics must include the ClawSecure brand identity** (mascot, logo, or brand colors) to reinforce the connection between ShutUp Tabs and ClawSecure.

---

## GRAPHICS MODE REFERENCE

- **REPORT mode:** Detailed visuals, normal text sizing. Used when images are viewed at full size (README images on desktop).
- **SOCIAL mode:** Marketing graphics with 2-3x larger text and 5x larger buttons for thumbnail visibility and engagement. Used when images appear as thumbnails (social shares, GitHub Explore).

---

## GRAPHIC 1: Social Preview Image

| Spec | Value |
|------|-------|
| **Filename** | `shutup-tabs-social-preview.png` |
| **Dimensions** | 1280 x 640 px (GitHub Open Graph standard) |
| **Mode** | **SOCIAL** -- text must be readable at thumbnail size |
| **Upload location** | GitHub Settings > General > Social Preview (NOT in the repo files) |
| **Purpose** | Appears when anyone shares the repo link on X/Twitter, LinkedIn, Slack, Discord, etc. |

**Content to include:**
- ClawSecure 3D mascot (prominent, left or center)
- ClawSecure 3D logo (smaller, corner or alongside mascot)
- Title: **"ShutUp Tabs"** (large, prominent)
- Tagline: **"Auto-Close Claude Code Diff Tabs"**
- Subtitle: **"Free VS Code Extension by ClawSecure"**
- Editor names: **"VS Code | Cursor | Windsurf | Antigravity"**
- URL: **clawsecure.ai**

**Design notes:**
- Dark background consistent with clawsecure.ai brand (#08090d or similar)
- Teal/cyan accent colors matching ClawSecure's palette
- All text must be legible at 600px wide (typical social card render size)
- Do NOT include fine detail or small text
- Consider a "mute" or "megaphone with X" visual motif to reinforce the "shut up" concept

---

## GRAPHIC 2: Extension Icon

| Spec | Value |
|------|-------|
| **Filename** | `icon.png` |
| **Dimensions** | 256 x 256 px (renders at 128x128 in marketplace, 256x256 for retina) |
| **Mode** | **ICON** -- must be recognizable at 32x32 px in sidebar |
| **File location in repo** | `images/icon.png` |
| **Purpose** | Extension icon in VS Code Marketplace, Extensions sidebar, search results |

**Content to include:**
- A megaphone with a slash/X through it (the "shut up" concept)
- ClawSecure brand color integration (teal/cyan accent on dark)
- Simple, bold design that reads at very small sizes
- Optional: subtle ClawSecure claw mark or logo element

**Design notes:**
- This icon must work at 32x32 (VS Code sidebar), 64x64 (marketplace grid), and 128x128 (marketplace detail)
- Avoid text in the icon; it will be too small to read
- Dark navy background (#1a1a2e) matching the galleryBanner color in package.json
- High contrast; the icon competes visually with hundreds of other extensions
- The current placeholder is a teal ring on dark navy; the production icon should be more distinctive and professional

---

## GRAPHIC 3: Hero Banner

| Spec | Value |
|------|-------|
| **Filename** | `shutup-tabs-hero-banner.png` |
| **Dimensions** | 1280 x 400 px (wide banner format for README) |
| **Mode** | **REPORT** -- viewed at full width on GitHub README |
| **File location in repo** | `images/shutup-tabs-hero-banner.png` |
| **Purpose** | First visual element on the README, immediately below badges |

**Alt-text (already written in README -- graphic must match):**
> ShutUp Tabs by ClawSecure -- auto-close Claude Code diff tabs and stop tab clutter in VS Code, Cursor, Windsurf, and Antigravity

**Content to include:**
- ClawSecure 3D mascot + 3D logo
- Title: **"ShutUp Tabs"** (primary, large)
- Subtitle: **"Auto-Close Claude Code Diff Tabs"** (secondary)
- Visual concept: a cluttered tab bar transforming into a clean one (before/after), or a megaphone being silenced
- Editor compatibility line: **"VS Code | Cursor | Windsurf | Antigravity"** (smaller text)
- "Free by ClawSecure" badge or text

**Design notes:**
- Wide banner format; horizontal composition
- Should feel like a professional product header, not a marketing ad
- Dark background consistent with clawsecure.ai brand
- Must render cleanly on both light and dark GitHub themes (test both)
- The "before/after" tab bar concept is the strongest visual hook: show a messy tab bar with [Claude Code] diff tabs on the left, and a clean tab bar on the right, with the ShutUp Tabs mascot/icon in the center

---

## DELIVERY CHECKLIST

After graphics are created:

1. [ ] All 3 PNGs exported at specified dimensions
2. [ ] Filenames match exactly (case-sensitive)
3. [ ] Upload Social Preview via GitHub > Settings > General > Social Preview
4. [ ] Replace `images/icon.png` with production icon (256x256)
5. [ ] Add hero banner as `images/shutup-tabs-hero-banner.png`
6. [ ] Rebuild .vsix after icon replacement: `cd ~/clawsecure/extensions/shutup-tabs && npx vsce package --allow-missing-repository`
7. [ ] Remove `<!-- TODO -->` comment from README.md
8. [ ] Commit and push all image changes
9. [ ] Verify hero banner renders correctly on the live GitHub README

---

## BRAND REFERENCE

- **Primary colors:** Dark background (#08090d or similar from clawsecure.ai)
- **Accent colors:** Teal/cyan (#00bcd4 range), matching the plasma/cybernetic aesthetic of the live site
- **Mascot:** 3D cybernetic lobster (available at `public/mascot.png` / `mascot.webp` in the private repo)
- **Logo:** ClawSecure 3D logo
- **Gallery banner:** Dark navy (#1a1a2e) as specified in package.json
- **Font style:** Clean, modern, professional; consistent with site typography
- **Live site for reference:** https://www.clawsecure.ai
