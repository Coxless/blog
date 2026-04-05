# Development Setup

This project uses [mise](https://mise.jdx.dev/) for runtime management (Node.js, pnpm) and pnpm for package management.

## Workflow

- Install dependencies: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Tests: `pnpm test`
- Type check: `pnpm exec tsc --noEmit`

## Review Checklist for Agents

- [ ] Run `pnpm install` after pulling remote changes and before getting started.
- [ ] Run `pnpm exec tsc --noEmit` and `pnpm test` to validate changes.
