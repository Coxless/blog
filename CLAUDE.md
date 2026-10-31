# Development Setup

This project uses [Workshop](https://ubuntu.com/workshop/docs/) (`.workshop/dev.yaml`) for the development environment. Node.js, pnpm (via Corepack), and Rust exist only inside the workshop, not on the host, so run them through `workshop`.

## Workflow

- Create the environment: `workshop launch dev`, then `workshop run -- setup`
- Install dependencies: `workshop exec dev -- bash -lc 'cd /project && pnpm install'`
- Dev server: `workshop run -- dev` (http://127.0.0.1:5173 on the host)
- Build: `workshop run -- build`
- Tests: `workshop run -- test`
- Type check, tests, and build together: `workshop run -- check`
- Rebuild the WASM demo: `workshop run -- wasm` (commit `apps/web/public/wasm/demo.wasm`)

Posts are MDX files in `apps/web/content/{products,notes,lab}`. See README.md for the format.

## Review Checklist for Agents

- [ ] Run `pnpm install` in the workshop after pulling remote changes and before getting started.
- [ ] Run `workshop run -- check` to validate changes.
