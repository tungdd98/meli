---
name: pencil-mobile-design
description: Use when creating or editing Pencil .pen designs for the meli project, especially feature screens, auth flows, mobile mockups, or UI specs that must match libs/ui.
---

# Pencil Mobile Design

## Overview

Create Pencil designs that match this repo's UI system: one mobile screen, default state only, using `libs/ui` tokens.

## Non-Negotiables

- Use Pencil MCP tools for `.pen` files; do not read or edit `.pen` content with shell tools.
- Use tokens from `libs/ui/src/lib/theme/`: palette, typography, shape, shadows, and component conventions.
- Design mobile only. Do not add desktop/tablet artboards unless the user explicitly asks.
- Design only the default UI state. Do not add loading, error, empty, success, focus, or validation variants unless explicitly asked.
- Prefer one top-level frame.

## Workflow

1. Read the feature spec and relevant `libs/ui/src/lib/theme/*`.
2. Open or create the requested `.pen` file with Pencil MCP.
3. Set Pencil variables mirroring `libs/ui`: `meli-primary`, `meli-background`, `meli-paper`, `meli-coral-100`, `meli-text-primary`, `meli-radius-lg`, `meli-radius-xl`.
4. Create one mobile frame, usually `390x844`, named for the screen, with `placeholder:true` while editing.
5. Build the default UI with flex layout unless a specific visual asset requires absolute positioning.
6. Remove the placeholder flag when done.
7. Verify with `snapshot_layout(..., problemsOnly:true)` and `get_screenshot`.
8. Save the Pencil document and confirm the file exists on disk.

## Token Mapping

| libs/ui token                        | Pencil use                                                         |
| ------------------------------------ | ------------------------------------------------------------------ |
| `palette.primary.main #F08180`       | Primary buttons and brand accents                                  |
| `palette.background.default #FFF5F5` | Mobile screen background                                           |
| `palette.background.paper #FFFFFF`   | Cards and inputs                                                   |
| `palette.coral.100 #FFE0E0`          | Card/input borders                                                 |
| `palette.text.primary #1A1A2E`       | Main text                                                          |
| `palette.text.secondary #6B7280`     | Supporting text                                                    |
| `shape.lg 16px`                      | Inputs and buttons                                                 |
| `shape.xl 20px`                      | Cards                                                              |
| `typography.fontFamily`              | Use `Plus Jakarta Sans` directly if Pencil rejects a font variable |

## Default Mobile Pattern

Use a single mobile artboard:

```text
Mobile frame 390x844
└── Screen content
    └── Default UI only
```

For auth/login screens, include only the normal form: logo/image, centered heading copy, email input, password input, visibility icon, and submit button. Skip error/loading examples unless requested.

## Common Mistakes

| Mistake                                         | Fix                                              |
| ----------------------------------------------- | ------------------------------------------------ |
| Creating desktop and state boards by habit      | Delete them; keep mobile default only            |
| Using arbitrary colors/radius                   | Read `libs/ui` and set matching Pencil variables |
| Showing validation/loading/error states unasked | Remove those frames and controls                 |
| Leaving `placeholder:true` on finished frames   | Update the final screen to `placeholder:false`   |
| Font variable renders invalid                   | Use literal `Plus Jakarta Sans`                  |
| Unsaved MCP document not on disk                | Activate Pencil, save, then verify with `ls`     |

## Baseline Failures This Prevents

Without this skill, agents tend to overproduce: desktop screens, state artboards, and non-project colors. This skill narrows output to the requested mobile default screen grounded in `libs/ui`.
