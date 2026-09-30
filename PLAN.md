# Plan

## What I am building
I am repairing a small static login-protected gallery so the gallery content is not embedded in the initial DOM and authentication logic no longer exposes a trivial client-side bypass. Because no upstream HLD or LLD was available in the task inputs, this plan is inferred from the existing repository and the security defect visible in the current app.

## Upstream read
- `.engine/external_source.json`
- Existing application files in workspace root: `index.html`, `app.js`, `style.css`
- No HLD found at `/hld_architect/hld.md`
- No LLD found under `/lld_architect/*.md`
- No README, `package.json`, or existing tests found

## UI decision
- Mode: preserve
- Product shape: focused workflow
- House style: design-modern
- Inherited system: none named
- Why: keep the current simple single-page layout and only refine messaging and states needed for the repaired login flow.

## Pre-existing Repository Issues
- No configured test runner exists. Baseline check confirmed there is no `package.json`, no README test command, and no `**/*test*` files.
- Baseline verification status: blocked before edits because the repository has no automated test suite.
- Affected files/modules: whole repository verification surface.

## Files

### Slice: secure-gallery-login
- `index.html` — remove hidden preloaded gallery images and add a protected content placeholder plus improved status text.
- `app.js` — replace insecure hardcoded bypass flow with a safer client-side gate that only renders gallery content after valid credentials are supplied.
- `style.css` — support the updated protected gallery layout and status states.
- `tests/app.test.js` — targeted Node-based regression tests for login logic and protected rendering.
- `CHANGELOG.md` — summarize the security repair and verification performed.
- `README.md` — explain local usage and how to run the added tests.

## Verification
- Unit: `node --test tests/app.test.js` → all targeted tests pass, 0 failures
- Build: not applicable for plain static HTML/CSS/JavaScript app
- Manual static smoke: open `index.html` in a browser → gallery appears only after valid login

## Ordered work
1. Repair the login and gallery rendering flow so protected content is not present before authentication.
2. Add targeted automated tests covering valid login, invalid login, and no-bypass behavior.
3. Update documentation and changelog for the brownfield repair.
