# AWS Student Community Day · Cochabamba 2026

Website for the AWS Student Community Day at Universidad Privada Boliviana,
Cochabamba — **3 October 2026, 09:00–18:00**. Registration links out to
[Luma](https://luma.com/r65j1ukn).

```
aws-student-builder-group-design/   brand system (tokens, guidelines, reference art)
Resources/                          raw logo and icon SVGs
web/                                the Next.js site
```

## Running it

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run check    # typecheck + lint + tests + production build
```

Deploy target is Vercel with the root directory set to `web`.

## Editing content

Everything an organiser needs to change lives in `web/src/content/` as typed
TypeScript. `tsc` validates it at build time, and `npm run test` asserts the
structural rules the type system can't express (no duplicate track in a block, no
workshop spanning across a break, no overlapping times).

| File | Holds |
|---|---|
| `event.ts` | Date, venue, Luma URL, contact addresses |
| `agenda.ts` | The full-day programme |
| `tracks.ts` | The three tracks and two workshop rooms |
| `speakers.ts` | Speaker bios (empty until confirmed) |
| `sponsors.ts` | The four sponsorship tiers and confirmed logos |
| `team.ts` | Organising team (empty until confirmed) |
| `faq.ts` | Frequently asked questions |

### Announcing a session

Sessions model "not announced yet" as a variant, not as the string
`"Por anunciar"` — so a placeholder can never be mistaken for real content. To
fill one in, switch the variant and add a title:

```ts
// before
{ id: "b1-ai", trackId: "ai", status: "tba", format: "charla" }

// after
{ id: "b1-ai", trackId: "ai", status: "confirmed", format: "charla",
  title: "Agentes con Amazon Bedrock", speakerIds: ["ada-lovelace"] }
```

Add the matching speaker to `speakers.ts` with `confirmed: true`. Nothing in the
components has to change. Sections that would render empty (Team, the sponsor
logo wall) hide themselves until they have data.

## Design rules that are load-bearing

The look comes from the constraints in
`aws-student-builder-group-design/README.md`, not from decoration. Breaking these
is what makes the site look generated:

- **No** glows, gradients (outside the grid motif), backdrop blur, neon,
  photography, or emoji. The 80px hairline grid is the only background texture.
- **Orange is only for calls to action.** Tracks use sky / green / purple.
- **Every solid accent fill takes a dark label.** White on orange measures
  2.14:1. `slate-400` is a hairline colour and fails AA as body text at 3.09:1 —
  muted text is `slate-200`.
- **Amazon Ember has only two weights**, 300 and 500. Never fake-bold it.
- Motion is fades and small y-translates. No bounce or elastic easing, no
  parallax, no scale on hover.

## Verification

`npm run check` gates typecheck, lint, tests and the production build. Beyond it,
the checks that actually matter here:

- **Reduced motion** — emulate `prefers-reduced-motion: reduce`; nothing may move
  and, more importantly, nothing may stay invisible.
- **JavaScript off** — every section must still render. Reveal rest states are
  gated on `html[data-js]`, set by a head script, so a failed bundle cannot leave
  the page blank.
- **axe** at `wcag2a/2aa/21a/21aa` — currently zero violations on all three routes.
- **375px** — no horizontal page overflow on any route.

## Known gaps

- **No AWS logo.** Not used anywhere, by decision. The identity is the orange
  chip mark next to the group name set in JetBrains Mono, which is what the brand
  system prescribes.
- **Amazon Ember licensing** is worth confirming with an AWS Community contact
  before this goes public; the fallback is Inter and it is cheap to swap now.
- Agenda bloques 2, 5 and 7 were reconstructed from a corrupted draft and are
  marked `RECONSTRUIDO` in `agenda.ts`.
- Venue room names, the team roster and sponsor logos are still placeholders.
