---
name: responsive-a11y-checker
description: Audit mobile responsiveness across 10 device breakpoints (375px to 1920px) and verify WCAG 3.1 AAA accessibility rules.
---

# Responsive & WCAG 3.1 AAA Accessibility Checker Skill

This skill outlines guidelines and checklist audits to verify fluid mobile responsiveness across 10 device profiles and ensure strict compliance with WCAG 3.1 AAA (Readable) guidelines.

## 1. Breakpoints & Device Testing Matrix

When auditing layout responsiveness, the agent must verify rendering on the following 10 device profiles:

| Profile | Width | Height | Representative Devices |
| :--- | :--- | :--- | :--- |
| **Mobile Small** | `375px` | `667px` | iPhone SE, Older Android Phones |
| **Mobile Medium** | `390px` | `844px` | iPhone 13 / 14 Pro, Samsung Galaxy S22 |
| **Mobile Large** | `412px` | `915px` | Google Pixel 7, Samsung Galaxy Ultra |
| **Tablet Small** | `768px` | `1024px` | iPad Mini, Samsung Galaxy Tab |
| **Tablet Large** | `820px` | `1180px` | iPad Air, Premium Tablets |
| **Laptop Small** | `1024px` | `1366px` | iPad Pro (Portrait), Small Netbooks |
| **Laptop Medium** | `1280px` | `800px` | Macbook Air 13", Standard Chromebooks |
| **Desktop Standard** | `1366px` | `768px` | Budget Desktop Monitors |
| **Desktop Medium** | `1440px` | `900px` | Macbook Pro 14" / 16", Desktop Monitors |
| **Desktop Large** | `1920px` | `1080px` | Standard HD Display Monitors |

### Responsiveness Verification Protocol
1. **No Horizontal Scroll**: Ensure no page causes `overflow-x` scrolling at any of the 10 sizes.
2. **Fluid Scaling**: Verify padding/margins drop cleanly (e.g., from `var(--space-8)` to `var(--space-4)`) on smaller breakpoints.
3. **Flex & Grid Wrapping**: Verify lists or grids collapse from 3/4 columns to 1/2 columns below `900px` (or appropriate tablet/mobile thresholds).
4. **Touch Target Size**: Touch elements (buttons, links) must have an active target size of at least `48x48px` on mobile profiles (< `768px`).

---

## 2. WCAG 3.1 AAA Accessibility Audit (Readable)

WCAG 3.1 focuses on making text content readable and understandable. Under AAA, the following requirements must be validated:

### 3.1.1 Language of Page (Level A)
- **Check**: The `<html>` tag must have a valid `lang` attribute (e.g. `<html lang="en">`).

### 3.1.2 Language of Parts (Level AA)
- **Check**: Any foreign words or blocks of text in a different language must use the `lang` attribute on their enclosing tags (e.g., `<span lang="bn">...</span>`).

### 3.1.3 Unusual Words (Level AAA)
- **Requirement**: Provide a mechanism for identifying specific definitions of words used in an unusual or limited way, including idioms and jargon.
- **Auditing**: Scan pages for specialized marketing terms or technical jargon (e.g., "CMO", "FMCG", "VUS", "pLDDT"). Ensure these are defined in-text, via tooltip, or in a glossary page.

### 3.1.4 Abbreviations (Level AAA)
- **Requirement**: Provide a mechanism for identifying the expanded form or explanation of abbreviations.
- **Auditing**: Make sure abbreviations (e.g., "AI", "APAC", "GCC", "FMCG", "CMO") are expanded on their first occurrence on each page (e.g., `Group Chief Marketing Officer (CMO)`).

### 3.1.5 Reading Level (Level AAA)
- **Requirement**: When text requires reading ability more advanced than lower secondary education, provide supplementary content or a simplified version.
- **Auditing**: Verify that technical write-ups or research insights are accompanied by clear summaries or introductory guides (e.g., an intro paragraph explaining complex findings in plain language).

### 3.1.6 Pronunciation (Level AAA)
- **Requirement**: Provide a mechanism for identifying the pronunciation of words where meaning is ambiguous without it (e.g. heteronyms).
- **Auditing**: Check if any terms could cause pronunciation/meaning ambiguity, and clarify in-line or via annotations where necessary.

---

## 3. General AAA Accessibility Rules

In addition to 3.1, the agent should verify these standard Level AAA checkpoints:
- **Contrast (Enhanced)**: Ensure text contrast ratios are at least `7:1` for regular text and `4.5:1` for large text (bold 18px+ or regular 24px+).
- **No Reflow Loss**: Web content must resize up to 200% without loss of content or layout breakage.
- **Keyboard-only Navigation**: Users must be able to navigate the entire site using only the Tab key, with clearly visible focus indicators (`:focus-visible`).
- **No Images of Text**: Avoid using images containing written copy unless they are decorative or brand logos.

---

## 4. Running Automated Audits

You can execute the custom Node.js audit script included with this skill to automatically check layout properties, language attributes, and abbreviations expansion:
```bash
node .agents/skills/responsive-a11y-checker/scripts/audit.js
```
