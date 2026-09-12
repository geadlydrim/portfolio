# Install Impeccable skill (Claude Code, global scope, no hook)

## Context

Install the Impeccable design skill (https://github.com/pbakaus/impeccable) for Claude Code on this machine. User chose **global scope** (`~/.claude/skills/impeccable`, available to every Claude Code project, not just this portfolio repo) and **no automatic hook** (skill/commands only, no `PostToolUse`/`Stop` design-detector wired into `.claude/settings.local.json`). This install touches only the user's home-directory Claude Code config; it makes zero changes to the `portfolio` repo (no git diff expected).

Verified this session:
- Node v22.4.0, npm 10.8.2, npx 10.8.2, git 2.45.2 all present on PATH (`where`/`--version` checks).
- Outbound network reachable: `https://registry.npmjs.org/impeccable` → 200, `https://impeccable.style` → 200 (curl.exe).
- `~/.claude/skills/` does not currently exist (confirmed via `Test-Path`) — clean global install target, nothing to overwrite.
- Node v22.4.0 is below the versions with a known silent-install-failure bug (GitHub issue #250: v24.16.0 / v26.1.0+), so no version workaround needed.
- Upstream repo commits the compiled skill payload at `.claude/skills/impeccable/` (`SKILL.md` 11896 bytes, `reference/`, `scripts/` incl. `impeccable`, `impeccable.cmd`, `command-metadata.json`, `VERSION`, `live-browser*.js`, `modern-screenshot.umd.js`, `scripts/data/`) — confirmed by fetching `.claude/skills/impeccable/SKILL.md` raw and by GitHub tree listing. This is the exact tree the global install must produce under `~/.claude/skills/impeccable/`.

## Approach

1. **Run the CLI installer, non-interactively, targeting global scope with hooks disabled.**
   From the portfolio project root (`C:\Users\KEANUAGUSTIN\orca\portfolio`), start the installer under `hub` (not plain `bash`) so any residual confirmation prompt can be answered without hanging:
   ```
   hub op=start name=impeccable-install application=npx args=["impeccable","install","--providers=claude","--scope=global","--no-hooks"] pty=true ready={"log":"(installed|Reload|complete|Done)","timeout":60}
   ```
   - `--providers=claude` selects only the Claude Code provider (skips the tool-detection prompt).
   - `--scope=global` selects the global target (skips the project-vs-global prompt) → writes to `~/.claude/skills/impeccable/`, not the project's `.claude/`.
   - `--no-hooks` skips the hook-manifest install for this run "without recording anything" (per upstream docs) — no `.claude/settings.local.json`/`.impeccable/config.local.json` write in the project.
   - If the process asks anything further (e.g., a final "proceed?" confirmation), use `hub op=send name=impeccable-install text="y"` (or `keys:["ENTER"]`) to answer it, then `hub op=wait name=impeccable-install for=exit timeout=60`.
   - If the process exits non-zero or the log shows an error, read the full output with `hub op=logs name=impeccable-install` before retrying — do not blindly re-run.

2. **Verify the global skill directory matches the upstream tree.**
   Confirm (via `read`/`bash Test-Path`) that `C:\Users\KEANUAGUSTIN\.claude\skills\impeccable\` now contains:
   - `SKILL.md` (frontmatter `name: impeccable`)
   - `reference\` (per-command `.md` files: `audit.md`, `polish.md`, `critique.md`, etc.)
   - `scripts\impeccable.cmd`, `scripts\impeccable`, `scripts\command-metadata.json`, `scripts\VERSION`, `scripts\data\`

3. **Smoke-test the installed launcher directly** (proves the payload is a working binary launcher, not just static files):
   ```
   & "$env:USERPROFILE\.claude\skills\impeccable\scripts\impeccable.cmd" --help
   ```
   First invocation may download the pinned engine binary into `~/.impeccable/bin/` (network already confirmed reachable) — expected, not an error. Confirm it prints CLI usage/help text rather than an error/stack trace.

4. **Confirm no unintended changes landed in the portfolio repo.**
   - `Test-Path C:\Users\KEANUAGUSTIN\orca\portfolio\.claude\skills` → must stay `False` (global scope must not touch the project).
   - `Test-Path C:\Users\KEANUAGUSTIN\orca\portfolio\.impeccable` → must stay `False` (no hook config was requested).
   - `git -C C:\Users\KEANUAGUSTIN\orca\portfolio status --porcelain` → must be empty (no tracked or untracked changes introduced by the install).

## Critical files & anchors

- `C:\Users\KEANUAGUSTIN\.claude\skills\impeccable\SKILL.md` — installed skill entry point; confirms provider/version (`version: 4.3.1` at time of writing) and the Commands table (`craft`, `shape`, `init`, `document`, `extract`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`, `live`).
- `C:\Users\KEANUAGUSTIN\.claude\skills\impeccable\scripts\impeccable.cmd` — Windows launcher; the actual executable surface to smoke-test.
- `C:\Users\KEANUAGUSTIN\orca\portfolio\.claude\settings.json` — existing project Claude Code config; must remain untouched (`worktree.bgIsolation: "none"`, unrelated to this install).

## Verification

- `hub op=logs name=impeccable-install` shows a successful/clean exit (exit code 0) with no error output.
- File-existence checks in Approach step 2 all pass.
- `impeccable.cmd --help` (step 3) prints usage text, confirming the launcher resolves and runs the engine binary end-to-end.
- `git -C <portfolio-root> status --porcelain` is empty and `Test-Path <portfolio-root>\.claude\skills` / `Test-Path <portfolio-root>\.impeccable` are both `False` — proves the install stayed global-only with no hook artifacts, as chosen.
- Once verified, the skill is usable in any future Claude Code session (in this repo or elsewhere) via `/impeccable <command>`, e.g. `/impeccable audit` — this plan does not run any `/impeccable` command itself, since doing so (esp. `init`, which writes `PRODUCT.md`) is a separate, unrequested task.

## Assumptions & contingencies

- **If `npx impeccable install --providers=claude --scope=global --no-hooks` exits non-zero or the network calls fail at execution time:** fall back to a manual git-based copy, since the upstream repo commits the exact global-install payload:
  ```
  git clone --depth 1 https://github.com/pbakaus/impeccable.git "$env:TEMP\impeccable-src"
  New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills" | Out-Null
  Copy-Item -Recurse -Force "$env:TEMP\impeccable-src\.claude\skills\impeccable" "$env:USERPROFILE\.claude\skills\impeccable"
  Remove-Item -Recurse -Force "$env:TEMP\impeccable-src"
  ```
  Then continue with Approach steps 2–4 unchanged. This reproduces the same tree the CLI installer would have written, minus the installer's own bookkeeping (e.g., recorded provider/scope choice in `~/.impeccable/config.local.json`), which is not required for the skill to function — the launcher self-downloads its engine binary on first run regardless of install method.
- **If the smoke test (step 3) reports it cannot download the engine binary (offline at execution time):** the skill markdown/commands are still installed and discoverable; note in the final report that the engine-backed verbs (`detect`, `hooks`, `doctor`, live mode) will self-heal on first run once network is available, and re-run step 3 then to confirm.
- User already decided scope=global and hooks=off in this conversation; do not re-prompt for these during execution.
