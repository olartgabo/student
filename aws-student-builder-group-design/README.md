# AWS Student Builder Group (UPB) — Design System

Brand and UI kit for the **AWS Student Builder Group at Universidad Privada de Bolivia (UPB), Cochabamba, Bolivia** — a student-run tech community running workshops, talks and events (e.g. "Student Community Day") for the university's builder community.

## Sources
- Figma file `SBGUPB.fig` (mounted read-only): one page with a moodboard of official logos (AWS, UPB), the group's own chip-mark icon, and past event/slide-deck artwork ("Inspo", "Posts Examples"). It defines **no reusable components** — this is a brand-asset file, not a component library. See `guidelines/` and `assets/` for what was extracted.
- Uploaded files: `Amazon-Ember-Medium.ttf`, `AmazonEmber_Lt.ttf` (brand typeface, two weights only), `AWS Student Builder Group_UPB 1.png` (the group's badge tile).

Because the source defined no components, this system authors a small standard set (Button, Badge, Tag, Card, Input, Callout) sized to the community's real needs (events, sign-ups, team) — see "Intentional additions" below.

## Index
- `styles.css` — root stylesheet, imports everything under `tokens/`
- `tokens/` — colors, typography, spacing, fonts (`@font-face`)
- `assets/` — logos (`assets/logos/`), the group's chip-mark icon (`assets/icons/`), reference imagery from past decks (`assets/reference/`)
- `components/` — Button, Badge, Tag, Card, Input, Callout (each folder: `.jsx` + `.d.ts` + `.prompt.md` + a `@dsCard` html)
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand marks, grid motif)
- `ui_kits/website/` — full homepage recreation for the community site
- `templates/event-deck/` — a 5-slide event/talk deck template (Title, Agenda, Stat, Quote, Closing)
- `thumbnail.html` — homepage tile for this design system

## Components
Button, Badge, Tag, Card, Input, Callout, Homepage (full-page screen, in `ui_kits/website/`).

### Intentional additions
The Figma source defines zero components (it's a moodboard, not a UI kit). Button, Badge, Tag, Card, Input and Callout were authored from scratch, sized to what a student community site and event decks actually need — not a generic "full app" component set. No Tabs/Dialog/Toast/etc. were added since nothing in the source or brief calls for them.

## Content fundamentals
- **Language:** bilingual — English for global/AWS-facing content ("Student Community Day", "Build · Connect · Grow"), Spanish for local UPB event copy ("Inscripciones Abiertas", "La comunidad tecnológica universitaria se encuentra aquí"). Match the audience: campus-facing event copy in Spanish, community-brand copy in English.
- **Voice:** direct, short declarative sentences. The tagline "Build · Connect · Grow" is the clearest example — three verbs, no fluff.
- **Casing:** headlines are Title Case or Sentence case in the deck examples; eyebrow labels and metadata are set in ALL CAPS with wide letter-spacing (`// AWS Student Builder Group`, `SC-DAY // 001`), styled like code comments — a nod to the "builder"/developer identity.
- **Person:** community-facing copy addresses builders directly and warmly ("la comunidad ... se encuentra aquí" — the community IS here, not "join us"). Avoid corporate marketing tone.
- **Emoji:** none observed anywhere in the source material. Do not add any.
- **Numerals & stats:** used sparingly and big — one hero number per stat slide (e.g. "201 años"), not dense data.

## Visual foundations
- **Palette:** deep navy (`--navy-900 #06175D`, from the UPB mark) as the primary brand color; a near-black slate (`--slate-900 #161D26`) as the dominant page/deck background — NOT pure black. AWS orange (`#FF9900`) is the primary accent for CTAs and the community's own chip icon. Sky blue (`#42B4FF`), green (`#01E582`) and purple (`#AD5CFF`) are secondary accents used one-at-a-time to differentiate slide types or tags — never all together on one surface, and never as glow/gradient effects (the user has explicitly asked to avoid an "AI slop" neon look — accents here are flat, solid fills).
- **Type:** two families. **Amazon Ember** (Light 300 / Medium 500 — only these two weights were provided) is body copy and UI text. **JetBrains Mono** (substituted, see Caveats) is the display/headline face and all-caps eyebrow labels — a deliberate "builder/terminal" personality distinct from body text. Headlines run large (72–104px) and left-aligned; body copy stays modest (16–18px) and light-weight for a calm read.
- **Spacing:** an 8-based rhythm (4/8/12/16/24/32/48/64/96px) with generous whitespace — slides and pages favor a few large elements over dense grids.
- **Backgrounds:** flat dark surfaces are the default. A subtle **80px hairline grid** (low-contrast, ~25–35% opacity lines) is the one recurring background texture, echoing the source deck's grid frames — used sparingly, never combined with glow or noise. Occasional full-bleed brand-color slides (navy or green) for section breaks / closing slides. No photography, illustration, or pattern fills beyond the grid.
- **Animation:** not defined by the source (a static brand file). Recommend simple, restrained transitions only if needed (fades, no bounce/elastic easing) — nothing flashy, consistent with the "not too much neon/AI-slop" direction.
- **Hover / press states:** buttons darken (primary orange → `--orange-700`) or gain a subtle white-tinted fill (outline/secondary) on hover; no scale/shrink effects defined — kept minimal and functional.
- **Borders & radii:** small, sharp radii — `4px` default (buttons, badges), `8px` for cards, full pill only for filter-style Tags. Card borders are a thin 1px `--slate-600` hairline, never a colored left-border (that pattern is reserved for the one-off `Callout` component only).
- **Shadows:** soft, low-opacity dual shadows on dark cards (`--shadow-card`) — subtle depth, not heavy drop shadows.
- **Transparency / blur:** used only for tinted badge backgrounds (accent color at ~14% opacity behind full-opacity text) — no backdrop-blur/glassmorphism anywhere in the source.
- **Imagery color vibe:** none provided beyond the past decks' neon-line illustrations (Rio statue wireframe, Bolivia network map) — kept as `assets/reference/` only, not part of the forward-looking direction, per the request to move away from that neon aesthetic.
- **Corner radii recap:** 4px (buttons/badges) · 8px (cards) · pill (chips).

## Iconography
- The group's own mark is a small **orange pixel/circuit "chip" glyph** (`assets/icons/sbg-chip-mark.svg`) — used standalone or paired with the "AWS Student Builder Group" wordmark set in JetBrains Mono. There is no separate custom wordmark logo; the name is always set in type.
- No icon font or broader icon set was found in the source. Past decks used a handful of one-off pixel-art glyphs (trophy, speaker, chip) as decorative accents on section slides — these are illustrative one-offs, not a system, and were not recreated.
- Emoji: never used. Unicode symbols: none observed.
- For any additional UI icons this system's components need (e.g. a close "×" on `Tag`), plain text glyphs or, if a broader icon set is needed later, a stroke-based CDN set (e.g. Lucide) would match the flat, geometric brand best — flag this if adopted.

## Logos
- **AWS Student Builder Group:** no dedicated wordmark logo exists — render the name in type next to the chip mark (see above).
- **Universidad Privada de Bolivia (UPB):** partner institution logo, reconstructed pixel-exact from the source Figma's vector paths — badge lockup (`assets/logos/upb-badge-navy.svg` / `-white.svg`) and wordmark lockup (`assets/logos/upb-wordmark-navy.svg` / `-white.svg`). Third-party mark — use only for legitimate co-branding with the university, not as this system's own identity.
- **AWS:** the official "aws" smile logo appears in the source Figma as reference/sponsor credit. Its letterform fragments could not be reassembled pixel-exactly from the file (the reconstruction only preserves generic repeat counts, not per-letter positions), so only the smile-swash vector pieces were copied for reference (`assets/logos/partners/`) rather than a reconstructed full lockup. **Do not approximate the AWS logo by hand** — if a clean "aws" lockup is needed, ask the user for the official asset.

## Caveats — please help me iterate
- **Font substitution:** only Amazon Ember **Light** and **Medium** were provided (no Regular/Bold/Black). All type in this system uses just those two weights. If you have more Ember weights, upload them and I'll wire them in.
- **Monospace display face:** the source deck's headlines/labels are clearly set in a monospace font, but no font file was provided for it — I substituted **JetBrains Mono** from Google Fonts (technical, geometric, close to what's shown). Flag if you'd prefer a different mono face, or if you have the original file.
- **AWS logo:** not reconstructed as a full lockup (see Logos above) — only reference swash fragments were kept. Please provide the official AWS logo asset if you need to use it directly.
- **Small source file:** the Figma only contained a one-page moodboard (no component library, no real app/site screens) — the component set and the website UI kit here are original work built to fit the brand, not a recreation of an existing product. Let me know if there's a live site, deck template file, or app to recreate instead.
- The two neon-heavy event flier examples from the source (`assets/reference/`) were kept for reference only — the design system intentionally moves toward a flatter, less "AI slop" neon look per your request. Tell me if I've gone too far (or not far enough) in that direction.
