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
- Uses `CI=true` environment to disable Nx TUI

### Pre-push Hook
- Runs the full CI verification: `lint`, `test`, and `build` on affected projects
- Runs the exact same command that CI runs: `pnpm exec nx affected -t lint test build`
- Prevents pushes that would fail in CI
- Uses `CI=true` environment to disable Nx TUI

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

## Git Worktree Support

The installation script automatically detects git worktrees and installs hooks in both:
- Main repository hooks directory
- Worktree-specific hooks directory

This ensures hooks work correctly regardless of your git setup.

## Benefits

- **Catch issues early**: Find problems before they reach CI
- **Save time**: Avoid failed CI builds and the need to fix and re-push
- **Team consistency**: Everyone runs the same verification locally
- **Faster feedback**: Get immediate feedback instead of waiting for CI

## Example Output

### Successful Pre-commit
```
🔍 Running pre-commit checks...
Running lint and typecheck on affected projects...
✅ Pre-commit checks passed!
```

### Successful Pre-push
```
🚀 PRE-PUSH HOOK TRIGGERED! Running pre-push verification...
Current directory: /path/to/project
Git directory: /path/to/.git
Current branch: feature-branch
Running CI verification (lint, test, build) on affected projects...
✅ Pre-push verification passed! Safe to push.
```

## Troubleshooting

### Hooks not running
- Ensure hooks are installed: `pnpm run hooks:install`
- Check if hooks are executable: `ls -la .git/hooks/pre-*`
- For worktrees, hooks are installed in both main repo and worktree

### Terminal size errors
- The hooks use `CI=true` to disable Nx TUI
- If you still see terminal errors, the hooks will still work

### Bypassing hooks (not recommended)
```bash
# Skip pre-commit hook
git commit --no-verify

# Skip pre-push hook  
git push --no-verify
```

**Note**: Only use `--no-verify` in emergency situations, as it defeats the purpose of preventing CI failures.

## Technical Details

- Hooks are written in shell script for maximum compatibility
- Uses `CI=true` environment variable to disable Nx TUI in non-interactive environments
- Supports both regular git repositories and git worktrees
- Runs the same commands as CI to ensure consistency 