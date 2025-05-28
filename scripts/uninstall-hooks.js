#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the .git file to find the actual git directory
const gitFile = fs.readFileSync('.git', 'utf8').trim();
const gitDir = gitFile.startsWith('gitdir: ') 
  ? gitFile.replace('gitdir: ', '') 
  : '.git';

const hooksDir = path.join(gitDir, 'hooks');

const hooksToRemove = ['pre-commit', 'pre-push'];

let removed = 0;

hooksToRemove.forEach(hookName => {
  const hookPath = path.join(hooksDir, hookName);
  
  if (fs.existsSync(hookPath)) {
    try {
      fs.unlinkSync(hookPath);
      console.log(`✅ Removed ${hookName} hook`);
      removed++;
    } catch (error) {
      console.error(`❌ Failed to remove ${hookName} hook:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${hookName} hook was not installed`);
  }
});

if (removed > 0) {
  console.log(`\n✅ Successfully removed ${removed} git hook(s)`);
} else {
  console.log('\nℹ️  No hooks were installed to remove');
} 