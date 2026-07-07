# Contributing

This is a personal portfolio, so it's not really open for feature
contributions — but bug reports and fixes are welcome.

## Workflow

1. Fork the repo and create a branch off `main`.
2. `npm install`, then `npm run dev` to work locally.
3. Before opening a PR, make sure these pass:
   ```bash
   npm run lint
   npm run build
   ```
4. Keep PRs focused — one fix or one change per PR.
5. Don't add new dependencies without explaining why in the PR description.

## Content changes

If you're proposing a copy or content change, edit the relevant file in
`src/content/` rather than hardcoding text into a component — see the
"Project structure" section in [README.md](README.md).
