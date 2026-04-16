# Setup IndexNow Automation Workflow

This document contains the GitHub Actions workflow that needs to be manually created to enable automatic IndexNow submissions after deployments.

## Why Manual Setup?

GitHub Apps (like the Hive automation) cannot create or modify workflow files in `.github/workflows/` for security reasons. This workflow file must be created manually by a repository admin.

## Setup Instructions

1. **Create the workflow file:**
   ```bash
   # Create the file manually in your repository
   mkdir -p .github/workflows
   touch .github/workflows/indexnow-auto.yml
   ```

2. **Copy the workflow content below** into `.github/workflows/indexnow-auto.yml`

3. **Test the automation:**
   - Push changes to `src/lib/posts.ts` or other content files
   - Check GitHub Actions for the automatic IndexNow submission
   - Verify only new/changed URLs were submitted

## Workflow File Content

Copy this content into `.github/workflows/indexnow-auto.yml`:

\`\`\`yaml
name: Auto IndexNow Submission

on:
  push:
    branches: [main]
    paths:
      - 'src/lib/posts.ts'
      - 'src/app/**/*.tsx'
      - 'src/app/**/*.ts'
      - 'src/app/sitemap.ts'
      - 'src/components/**/*.tsx'

  # Allow manual trigger for testing
  workflow_dispatch:
    inputs:
      force:
        description: 'Force submission of all URLs (ignore state)'
        type: boolean
        default: false

env:
  SITE_URL: https://ciberpme.vercel.app

jobs:
  indexnow-submit:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Wait for Vercel deployment
      id: vercel-wait
      run: |
        echo "🕐 Waiting for Vercel deployment to complete..."

        # Wait up to 10 minutes for deployment
        timeout=600
        elapsed=0
        interval=30

        while [ $elapsed -lt $timeout ]; do
          # Check if site is responding with fresh content
          if curl -f -s --max-time 10 "$SITE_URL/api/health" > /dev/null; then
            echo "✅ Site is accessible at $SITE_URL"

            # Additional wait to ensure IndexNow can access the content
            echo "⏳ Waiting additional 60 seconds for search engine accessibility..."
            sleep 60

            echo "deployment_ready=true" >> $GITHUB_OUTPUT
            exit 0
          fi

          echo "⏳ Site not ready yet, waiting ${interval}s... (${elapsed}/${timeout}s elapsed)"
          sleep $interval
          elapsed=$((elapsed + interval))
        done

        echo "❌ Timeout waiting for deployment"
        echo "deployment_ready=false" >> $GITHUB_OUTPUT
        exit 1

    - name: Restore IndexNow state cache
      uses: actions/cache@v4
      with:
        path: .indexnow-state.json
        key: indexnow-state-${{ github.sha }}
        restore-keys: |
          indexnow-state-

    - name: Check for content changes
      id: content-check
      run: |
        echo "🔍 Checking for content changes..."

        # Force mode (manual trigger)
        if [ "${{ github.event.inputs.force }}" = "true" ]; then
          echo "🚀 Force mode enabled - will submit all URLs"
          echo "has_changes=true" >> $GITHUB_OUTPUT
          echo "change_reason=Manual force submission" >> $GITHUB_OUTPUT
          exit 0
        fi

        # Check if this is the first run (no state file)
        if [ ! -f .indexnow-state.json ]; then
          echo "🆕 No previous state found - first run"
          echo "has_changes=true" >> $GITHUB_OUTPUT
          echo "change_reason=Initial setup" >> $GITHUB_OUTPUT
          exit 0
        fi

        # Check git diff for content files
        if git diff --name-only HEAD~1 HEAD | grep -E "(posts\.ts|sitemap\.ts|app/.*\.(tsx|ts))" > /dev/null; then
          echo "📝 Content changes detected in commit"
          git diff --name-only HEAD~1 HEAD | grep -E "(posts\.ts|sitemap\.ts|app/.*\.(tsx|ts))"
          echo "has_changes=true" >> $GITHUB_OUTPUT
          echo "change_reason=Content files modified" >> $GITHUB_OUTPUT
        else
          echo "📋 No content changes detected"
          echo "has_changes=false" >> $GITHUB_OUTPUT
          echo "change_reason=No content changes" >> $GITHUB_OUTPUT
        fi

    - name: Run incremental IndexNow submission
      if: steps.vercel-wait.outputs.deployment_ready == 'true' && steps.content-check.outputs.has_changes == 'true'
      env:
        NODE_ENV: production
      run: |
        echo "🚀 Running IndexNow incremental submission..."
        echo "📋 Reason: ${{ steps.content-check.outputs.change_reason }}"

        # Set force mode for manual triggers
        if [ "${{ github.event.inputs.force }}" = "true" ]; then
          rm -f .indexnow-state.json
          echo "🗑️  Removed state file for force submission"
        fi

        # Run the incremental script
        npm run indexnow:auto

    - name: Save IndexNow state cache
      if: steps.vercel-wait.outputs.deployment_ready == 'true' && steps.content-check.outputs.has_changes == 'true'
      uses: actions/cache/save@v4
      with:
        path: .indexnow-state.json
        key: indexnow-state-${{ github.sha }}

    - name: Report results
      if: always()
      run: |
        echo "📊 IndexNow Automation Results:"
        echo "  • Deployment ready: ${{ steps.vercel-wait.outputs.deployment_ready }}"
        echo "  • Content changes: ${{ steps.content-check.outputs.has_changes }}"
        echo "  • Change reason: ${{ steps.content-check.outputs.change_reason }}"

        if [ -f .indexnow-state.json ]; then
          echo "📄 Current state:"
          cat .indexnow-state.json | jq '{ lastRun: .lastRun, urlCount: (.submittedUrls | length), postCount: (.lastPostDates | length) }' 2>/dev/null || echo "State file exists but not JSON parseable"
        else
          echo "📄 No state file found"
        fi

        echo ""
        echo "ℹ️  To manually trigger: Go to Actions → Auto IndexNow Submission → Run workflow"
        echo "ℹ️  To force submit all URLs: Use the 'Force submission' checkbox when manually triggering"

    - name: Notify on failure
      if: failure()
      run: |
        echo "❌ IndexNow automation failed!"
        echo "Check the logs above for details."
        echo ""
        echo "Common issues:"
        echo "  • Vercel deployment timeout"
        echo "  • Network issues accessing IndexNow API"
        echo "  • Changes to posts.ts structure"
        echo ""
        echo "You can manually run: npm run indexnow:auto"
\`\`\`

## How It Works

1. **Triggers:** Workflow runs on pushes to main that modify content files (posts.ts, app pages, components)

2. **Deployment Wait:** Waits up to 10 minutes for Vercel deployment to be accessible

3. **Change Detection:** Checks git diff and state cache to identify if new content was added

4. **Incremental Submission:** Runs the existing `scripts/indexnow-incremental.js` script that only submits new/updated URLs

5. **State Persistence:** Uses GitHub Actions cache to remember what was already submitted

6. **Manual Trigger:** Supports manual workflow dispatch with option to force submit all URLs

## Testing

After setup, you can test by:

1. **Manual trigger:** Go to Actions → Auto IndexNow Submission → Run workflow
2. **Content push:** Modify `src/lib/posts.ts` and push to main
3. **Check logs:** View the GitHub Actions run to see what URLs were submitted

## Benefits

- **Automatic:** No manual intervention needed after content updates
- **Efficient:** Only submits new/changed URLs, avoids IndexNow rate limits  
- **Reliable:** Waits for deployment completion, includes error handling
- **Transparent:** Detailed logging of what was detected and submitted