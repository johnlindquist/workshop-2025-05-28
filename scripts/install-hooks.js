#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read the .git file to find the actual git directory
const gitFile = fs.readFileSync('.git', 'utf8').trim();
const gitDir = gitFile.startsWith('gitdir: ') 
  ? gitFile.replace('gitdir: ', '') 
  : '.git';

const hooksDir = path.join(gitDir, 'hooks');

// Ensure hooks directory exists
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

const preCommitHook = `#!/bin/sh
# Pre-commit hook: Run linting and type checking on staged files

echo "🔍 Running pre-commit checks..."

# Check if there are any staged files
if git diff --cached --quiet; then
  echo "No staged files to check"
  exit 0
fi

# Run lint and typecheck on affected projects
echo "Running lint and typecheck on affected projects..."
if ! pnpm exec nx affected -t lint typecheck --base=HEAD~1; then
  echo "❌ Pre-commit checks failed. Please fix the issues before committing."
  exit 1
fi

echo "✅ Pre-commit checks passed!"
`;

const prePushHook = `#!/bin/sh
# Pre-push hook: Run full CI verification before pushing

echo "🚀 Running pre-push verification..."

# Get the current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Run the same command that CI runs
echo "Running CI verification (lint, test, build) on affected projects..."
if ! pnpm exec nx affected -t lint test build; then
  echo "❌ Pre-push verification failed!"
  echo "The same command that failed in CI is failing locally."
  echo "Please fix the issues before pushing."
  echo ""
  echo "You can run this manually with:"
  echo "  pnpm run ci:verify"
  echo ""
  echo "Or run on all projects with:"
  echo "  pnpm run ci:verify-all"
  exit 1
fi

echo "✅ Pre-push verification passed! Safe to push."
`;

// Write hooks
const preCommitPath = path.join(hooksDir, 'pre-commit');
const prePushPath = path.join(hooksDir, 'pre-push');

fs.writeFileSync(preCommitPath, preCommitHook);
fs.writeFileSync(prePushPath, prePushHook);

// Make hooks executable
try {
  execSync(`chmod +x "${preCommitPath}"`);
  execSync(`chmod +x "${prePushPath}"`);
  
  console.log('✅ Git hooks installed successfully!');
  console.log('');
  console.log('Installed hooks:');
  console.log(`  - pre-commit: ${preCommitPath}`);
  console.log(`  - pre-push: ${prePushPath}`);
  console.log('');
  console.log('The pre-push hook will run the same verification as CI before allowing pushes.');
  console.log('You can test it manually with: pnpm run ci:verify');
} catch (error) {
  console.error('❌ Failed to make hooks executable:', error.message);
  process.exit(1);
} 