# IndexNow Automation Setup

This document describes the automatic IndexNow URL submission system for CiberPME.

## Overview

The system automatically detects new and updated content and submits only those URLs to IndexNow for instant search engine indexing. This improves SEO by ensuring search engines are immediately notified of new content.

## Components

### 1. Incremental Script (`scripts/indexnow-incremental.js`)
- Detects new/updated URLs since last submission
- Tracks state to avoid resubmitting unchanged content  
- Submits only new URLs to IndexNow API
- Can be run manually with: `npm run indexnow:auto`

### 2. GitHub Action Workflow (Manual Setup Required)

The workflow file `.github/workflows/indexnow-auto.yml` needs to be created manually due to GitHub App permissions. Copy the contents from this PR into that file.

The workflow:
- Triggers on pushes to main branch (after deployments)
- Waits for Vercel deployment to complete
- Detects content changes in posts.ts and other content files
- Runs incremental submission only when new content exists
- Uses GitHub Actions cache to persist state between runs

### 3. State Management
- State stored in `.indexnow-state.json` (not tracked in git)
- Contains last run timestamp and submitted URLs
- Persisted via GitHub Actions cache between workflow runs

## Manual Setup Steps

1. **Create the workflow file:**
   ```bash
   # Copy the workflow file from this PR
   mkdir -p .github/workflows
   # Copy content from indexnow-auto.yml in this PR
   ```

2. **Test the system:**
   ```bash
   # Test incremental script locally
   npm run indexnow:auto
   
   # First run submits all URLs
   # Subsequent runs submit only new/updated content
   ```

3. **Verify automation:**
   - Push new content to main branch
   - Check GitHub Actions for automatic IndexNow submission
   - Verify only new/changed URLs were submitted

## Benefits

- **Automatic**: No manual intervention needed after setup
- **Incremental**: Only submits new content, avoiding spam
- **Fast**: Search engines are notified within minutes of deployment
- **State-aware**: Tracks what was already submitted
- **Content-aware**: Detects actual content changes, not just any push

## Monitoring

Check GitHub Actions logs for:
- Number of URLs submitted
- IndexNow API response status
- Content change detection results

The system logs detailed information about what was detected and submitted.