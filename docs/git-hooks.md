# Git Hooks Setup

This project includes git hooks to prevent CI failures by running verification locally before commits and pushes.

## Quick Setup

Install the git hooks:

```bash
pnpm run hooks:install
```

## Available Hooks

### Pre-commit Hook
- Runs linting and type checking on affected projects
- Only runs if there are staged files
- Prevents commits with linting/type errors

### Pre-push Hook
- Runs the full CI verification: `lint`, `test`, and `build` on affected projects
- Runs the exact same command that CI runs: `pnpm exec nx affected -t lint test build`
- Prevents pushes that would fail in CI

## Manual Verification

You can run the CI verification manually at any time:

```bash
# Run on affected projects (same as CI)
pnpm run ci:verify

# Run on all projects
pnpm run ci:verify-all
```

## Managing Hooks

### Install hooks
```bash
pnpm run hooks:install
```

### Uninstall hooks
```bash
pnpm run hooks:uninstall
```

## How It Works

The hooks are installed in your git repository's hooks directory and will:

1. **Pre-commit**: Check staged files for linting/type errors
2. **Pre-push**: Run full verification (lint, test, build) on affected projects

If any verification fails, the commit/push will be blocked with a clear error message.

## Benefits

- **Catch issues early**: Find problems before they reach CI
- **Save time**: Avoid failed CI builds and the need to fix and re-push
- **Team consistency**: Everyone runs the same verification locally
- **Faster feedback**: Get immediate feedback instead of waiting for CI

## Troubleshooting

If you need to bypass the hooks temporarily (not recommended):

```bash
# Skip pre-commit hook
git commit --no-verify

# Skip pre-push hook  
git push --no-verify
```

**Note**: Only use `--no-verify` in emergency situations, as it defeats the purpose of preventing CI failures. 