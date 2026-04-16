# IndexNow Automation via GitHub Actions

This document outlines an alternative approach to automatically submit new URLs to IndexNow after deployments using GitHub Actions instead of Vercel deploy hooks.

## Overview

The GitHub Actions approach provides several advantages:
- **Better CI/CD integration**: Runs as part of the standard deployment pipeline
- **Enhanced logging**: Detailed output and error reporting in GitHub Actions logs  
- **State management**: Automatically commits IndexNow state file updates to track submissions
- **Deployment validation**: Waits for deployment accessibility before submission
- **Manual testing**: Supports manual trigger for testing and troubleshooting

## How It Works

1. **Triggers**: GitHub Action runs after successful deployment to main branch
2. **Validation**: Waits for deployment to be accessible and validates IndexNow key
3. **Incremental submission**: Uses enhanced `indexnow-incremental.js` script to submit only new/updated URLs
4. **State tracking**: Updates and commits `.indexnow-state.json` to track submission history
5. **Comprehensive logging**: Provides detailed CI-friendly output for monitoring

## Setup Instructions

### 1. Create the GitHub Action Workflow

Create `.github/workflows/indexnow-post-deploy.yml`:

```yaml
name: IndexNow Post-Deploy Automation
run-name: "IndexNow: Auto-submit URLs after deployment"

# Trigger on successful deployments to production
on:
  deployment_status:
  workflow_run:
    workflows: ["Vercel Production Deployment"]
    types:
      - completed
    branches:
      - main
  # Manual trigger for testing
  workflow_dispatch:
    inputs:
      force_submit:
        description: 'Force submit all URLs (for testing)'
        required: false
        type: boolean
        default: false

permissions:
  contents: write  # Required to commit state file updates

jobs:
  indexnow-submit:
    runs-on: ubuntu-latest
    # Only run on successful deployments or manual dispatch
    if: >-
      (github.event.workflow_run.conclusion == 'success' && github.event.workflow_run.head_branch == 'main') ||
      (github.event.deployment_status.state == 'success' && github.event.deployment_status.environment == 'production') ||
      github.event_name == 'workflow_dispatch'
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Wait for deployment to be accessible
        if: github.event_name != 'workflow_dispatch'
        run: |
          echo "🔄 Waiting 30 seconds for deployment to be fully accessible..."
          sleep 30

      - name: Run IndexNow incremental submission
        run: |
          if [ "${{ github.event.inputs.force_submit }}" = "true" ]; then
            echo "🚀 Force submitting all URLs to IndexNow..."
            npm run indexnow
          else
            echo "🔄 Running incremental IndexNow submission..."
            npm run indexnow:auto
          fi
        env:
          SITE_URL: https://ciberpme.vercel.app

      - name: Log submission results
        if: always()
        run: |
          if [ -f ".indexnow-state.json" ]; then
            echo "📊 IndexNow submission state:"
            echo "Last run: $(jq -r '.lastRun // "Never"' .indexnow-state.json)"
            echo "Total URLs tracked: $(jq -r '.submittedUrls | length' .indexnow-state.json)"
            echo "Posts tracked: $(jq -r '.lastPostDates | keys | length' .indexnow-state.json)"
          else
            echo "⚠️ No state file found - this was likely the first run"
          fi

      - name: Commit state file updates
        if: always()
        run: |
          if [ -f ".indexnow-state.json" ]; then
            git config user.name "IndexNow Bot"
            git config user.email "noreply@github.com"

            # Check if state file has changes
            if ! git diff --exit-code .indexnow-state.json > /dev/null 2>&1; then
              git add .indexnow-state.json
              git commit -m "chore: update IndexNow submission state [skip ci]"
              git push origin main || echo "⚠️ Failed to push state file update"
              echo "✅ Updated IndexNow state file"
            else
              echo "📄 No changes to IndexNow state file"
            fi
          fi

      - name: Report success
        if: success()
        run: |
          echo "✅ IndexNow post-deployment submission completed successfully!"
          echo "🔍 New and updated URLs have been submitted to search engines for instant indexing"

      - name: Report failure
        if: failure()
        run: |
          echo "❌ IndexNow post-deployment submission failed"
          echo "🔧 Check the logs above for details on what went wrong"
          exit 1
```

### 2. Enhanced Script Features

The enhanced `indexnow-incremental.js` includes:

- **CI Detection**: Automatically detects GitHub Actions environment
- **Enhanced Logging**: Provides detailed environment info and progress tracking
- **Retry Logic**: Validates IndexNow key with retry mechanism for new deployments
- **Better Error Handling**: CI-aware error messages and recovery suggestions
- **State Management**: Improved state tracking for reliable incremental submissions

### 3. Testing

Test the setup manually:

```bash
# Test the enhanced script locally
npm run indexnow:auto

# Test via GitHub Actions (manual trigger)
# Go to GitHub Actions → IndexNow Post-Deploy Automation → Run workflow
```

## Comparison with Vercel Deploy Hook Approach

| Feature | GitHub Actions | Vercel Deploy Hook |
|---------|---------------|-------------------|
| **Setup Complexity** | Medium (workflow file) | Low (just webhook URL) |
| **Integration** | Native GitHub CI/CD | External webhook |
| **Logging** | GitHub Actions logs | Vercel function logs |
| **State Management** | Auto-commit to repo | API endpoint state |
| **Error Handling** | Detailed workflow reporting | Basic HTTP responses |
| **Manual Testing** | Easy manual trigger | API endpoint testing |
| **Reliability** | GitHub Actions SLA | Vercel functions SLA |

## Monitoring & Troubleshooting

### Check GitHub Actions Logs
1. Go to repository → Actions tab
2. Look for "IndexNow Post-Deploy Automation" workflows
3. Check individual run logs for submission details

### Verify State File
The `.indexnow-state.json` file tracks submission history:
- `lastRun`: Timestamp of last submission
- `submittedUrls`: All URLs that have been submitted
- `lastPostDates`: Date tracking for blog posts to detect updates

### Common Issues

**Workflow not triggering:**
- Check deployment event configuration
- Verify workflow file syntax
- Ensure proper permissions

**IndexNow submission failures:**
- Verify IndexNow key file is accessible at `${SITE_URL}/fc431a309850fb7ff6682a95bee49ba3.txt`
- Check for rate limiting (429 responses)
- Validate site URL configuration

**State file not updating:**
- Check write permissions for GitHub Actions
- Verify git configuration in workflow
- Look for commit failures in logs

## Benefits

✅ **Automatic**: No manual intervention required  
✅ **Efficient**: Only submits new/updated content  
✅ **Fast**: Search engines index new content immediately  
✅ **Reliable**: Built-in error handling and comprehensive logging  
✅ **Auditable**: All submissions tracked in GitHub Actions logs  
✅ **Testable**: Manual trigger support for testing and debugging  

This approach provides a robust, CI-native solution for automatic IndexNow URL submission that integrates seamlessly with existing GitHub Actions workflows.