# AGENTS.md

## Repo overview

Single-file JavaScript micro-library (`thenBy.js`). No monorepo, no workspaces.

## Commands

```sh
npm install          # install devDependencies
npm test             # build then run full test suite (tap reporter)
npm run build        # generate artifacts only (no tests)
```

Run a focused test (build first):
```sh
npm run build
node --test --test-reporter=tap --test-name-pattern="your test name" tests/thenby.tests.js
```

## Generated files — do not hand-edit

| File | How it's generated |
|---|---|
| `thenBy.module.js` | `thenBy.js` with `var firstBy =` replaced by `module.exports =` |
| `thenBy.min.js` | UMD-wrapped + minified from `thenBy.js` by `build.js` |

All logic changes go in `thenBy.js` only. Run `npm run build` or `npm test` to regenerate.

## Architecture

- `thenBy.js` — only hand-edited source
- `thenBy.module.d.ts` — TypeScript declarations, hand-maintained (not generated)
- `tests/thenby.tests.js` — all tests; Node `node:test` (`suite`/`test`) + `node:assert/strict`
- `build.js` — generates `thenBy.module.js` and `thenBy.min.js`; `npm run build`/`npm test` run it

## Testing quirks

- Tests `require('..')` which resolves to `thenBy.module.js` (the `main` entry). Build must run before tests.
- No fixtures, no snapshots, no external services — all test data is inline.
- The `'Sorting performance'` suite logs timing but makes no hard assertions; it is not flaky.

## Misc

- README table of contents is managed by `doctoc` (`npx doctoc README.md`) — don't manually edit the TOC block.
- No ESLint, no Prettier — `.editorconfig` enforces 4-space indent, LF line endings, UTF-8.
- CI (`.github/workflows/pipeline.yml`) runs on push and PR to `master` (Node 20.x and 22.x).
- `bower.json` is stale (version mismatch); ignore it.
