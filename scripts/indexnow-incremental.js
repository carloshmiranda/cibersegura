#!/usr/bin/env node

/**
 * IndexNow Incremental URL Submission Script
 *
 * Detects new and updated URLs since last submission and submits only those
 * to IndexNow API for instant search engine indexing. Uses state tracking
 * to avoid submitting unchanged content.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://ciberpme.vercel.app';
const INDEXNOW_KEY = 'fc431a309850fb7ff6682a95bee49ba3';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const STATE_FILE = path.join(__dirname, '..', '.indexnow-state.json');
const IS_CI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

// Base URLs that are always included if they don't exist in state
const BASE_URLS = [
  '',           // Homepage
  '/blog',      // Blog listing
  '/recursos',  // Resources page
  '/faq',       // FAQ page
  '/nis2',      // NIS2 page
  '/ferramentas', // Tools page
];

/**
 * Load current state from file
 */
function loadState() {
  try {
    if (!fs.existsSync(STATE_FILE)) {
      console.log('📝 No previous state found, will submit all URLs');
      return {
        lastRun: null,
        submittedUrls: [],
        lastPostDates: {}
      };
    }

    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    console.log(`📋 Loaded state from ${new Date(state.lastRun).toISOString()}`);
    console.log(`🔢 Previously submitted ${state.submittedUrls.length} URLs`);
    return state;
  } catch (error) {
    console.error('⚠️  Error loading state:', error.message);
    return { lastRun: null, submittedUrls: [], lastPostDates: {} };
  }
}

/**
 * Save current state to file
 */
function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
    console.log(`💾 State saved to ${STATE_FILE}`);
  } catch (error) {
    console.error('❌ Error saving state:', error.message);
  }
}

/**
 * Load posts from posts.ts and extract relevant data
 */
function loadPosts() {
  try {
    const postsPath = path.join(__dirname, '..', 'src', 'lib', 'posts.ts');

    if (!fs.existsSync(postsPath)) {
      console.log('⚠️  posts.ts not found');
      return [];
    }

    const content = fs.readFileSync(postsPath, 'utf8');

    // Extract post objects using regex (more robust than string matching)
    const postMatches = content.match(/{\s*slug:\s*"[^"]+",[\s\S]*?},?/g) || [];

    const posts = [];
    for (const match of postMatches) {
      try {
        const slug = match.match(/slug:\s*"([^"]+)"/)?.[1];
        const publishedAt = match.match(/publishedAt:\s*"([^"]+)"/)?.[1];
        const updatedAt = match.match(/updatedAt:\s*"([^"]+)"/)?.[1];

        if (slug && publishedAt) {
          posts.push({
            slug,
            publishedAt,
            updatedAt,
            url: `/blog/${slug}`
          });
        }
      } catch (error) {
        console.warn('⚠️  Failed to parse post:', error.message);
      }
    }

    console.log(`📄 Found ${posts.length} blog posts in posts.ts`);
    return posts;
  } catch (error) {
    console.error('❌ Error loading posts:', error.message);
    return [];
  }
}

/**
 * Detect new and updated URLs since last run
 */
function detectNewUrls(posts, state) {
  const newUrls = [];
  const currentTime = new Date().toISOString();

  // Check for new base URLs
  for (const baseUrl of BASE_URLS) {
    if (!state.submittedUrls.includes(baseUrl)) {
      newUrls.push(baseUrl);
      console.log(`🆕 New base URL: ${baseUrl}`);
    }
  }

  // Check for new or updated blog posts
  for (const post of posts) {
    const { slug, publishedAt, updatedAt, url } = post;
    const lastKnownDate = state.lastPostDates[slug];
    const currentDate = updatedAt || publishedAt;

    // New post (not in state)
    if (!lastKnownDate) {
      newUrls.push(url);
      console.log(`🆕 New post: ${slug} (published: ${publishedAt})`);
      continue;
    }

    // Updated post (date changed)
    if (currentDate > lastKnownDate) {
      newUrls.push(url);
      console.log(`🔄 Updated post: ${slug} (${lastKnownDate} → ${currentDate})`);
    }
  }

  // If no previous run, submit all URLs
  if (!state.lastRun) {
    console.log('🚀 First run detected, submitting all URLs');
    return [...BASE_URLS, ...posts.map(p => p.url)];
  }

  return newUrls;
}

/**
 * Update state with current posts data
 */
function updateState(posts, submittedUrls) {
  const newState = {
    lastRun: new Date().toISOString(),
    submittedUrls: [...BASE_URLS, ...posts.map(p => p.url)], // All known URLs
    lastPostDates: {}
  };

  // Store latest date for each post
  for (const post of posts) {
    newState.lastPostDates[post.slug] = post.updatedAt || post.publishedAt;
  }

  return newState;
}

/**
 * Submit URLs to IndexNow API
 */
async function submitToIndexNow(urls) {
  if (urls.length === 0) {
    console.log('✅ No new URLs to submit');
    return { submitted: 0, urls: [] };
  }

  const fullUrls = urls.map(path => SITE_URL + path);

  const payload = {
    host: SITE_URL.replace('https://', ''),
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: fullUrls
  };

  console.log(`🔄 Submitting ${fullUrls.length} new URLs to IndexNow...`);
  fullUrls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'CiberPME-IndexNow-Incremental/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        const statusCode = res.statusCode;

        if (statusCode === 200 || statusCode === 202) {
          console.log(`✅ IndexNow submission successful! Status: ${statusCode}`);
          resolve({
            submitted: fullUrls.length,
            urls: fullUrls,
            statusCode,
            response: responseData
          });
        } else {
          console.log(`⚠️  IndexNow submission completed with status: ${statusCode}`);
          console.log(`📝 Response: ${responseData}`);
          // Still resolve as this might be expected (e.g., 429 rate limit)
          resolve({
            submitted: fullUrls.length,
            urls: fullUrls,
            statusCode,
            response: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error submitting to IndexNow:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Validate IndexNow key accessibility with deployment-aware retry logic
 */
async function validateKeyFile() {
  console.log('🔑 Validating IndexNow key file...');

  const maxRetries = IS_CI ? 3 : 1;
  const retryDelay = 5000; // 5 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const isValid = await attemptKeyValidation();
      if (isValid) {
        console.log('✅ IndexNow key file is accessible and valid');
        return true;
      }

      if (attempt < maxRetries) {
        console.log(`⏳ Attempt ${attempt}/${maxRetries} failed, retrying in ${retryDelay/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    } catch (error) {
      console.warn(`⚠️  Attempt ${attempt}/${maxRetries} error:`, error.message);
      if (attempt === maxRetries) {
        console.warn('⚠️  Key validation failed after all attempts - continuing anyway');
        return false;
      }
    }
  }

  return false;
}

/**
 * Single attempt at key validation
 */
function attemptKeyValidation() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SITE_URL.replace('https://', ''),
      path: `/${INDEXNOW_KEY}.txt`,
      method: 'GET',
      timeout: 10000 // 10 second timeout
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 && data.trim() === INDEXNOW_KEY) {
          resolve(true);
        } else {
          console.error(`❌ Key validation failed. Status: ${res.statusCode}, Content: ${data.substring(0, 100)}`);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Main execution with deployment-aware enhancements
 */
async function main() {
  const runContext = IS_CI ? 'CI/deployment' : 'local';
  console.log(`🚀 Starting IndexNow incremental URL submission (${runContext})...\n`);

  if (IS_CI) {
    console.log('📝 Environment info:');
    console.log(`  • Site URL: ${SITE_URL}`);
    console.log(`  • GitHub Actions: ${process.env.GITHUB_ACTIONS || 'false'}`);
    console.log(`  • Workflow: ${process.env.GITHUB_WORKFLOW || 'n/a'}`);
    console.log('');
  }

  try {
    // Step 1: Load current state
    const state = loadState();

    // Step 2: Load current posts
    const posts = loadPosts();

    // Step 3: Detect new URLs
    const newUrls = detectNewUrls(posts, state);

    console.log(`\n📊 Analysis complete:`);
    console.log(`  • Total posts: ${posts.length}`);
    console.log(`  • New/updated URLs: ${newUrls.length}`);
    console.log(`  • Last submission: ${state.lastRun ? new Date(state.lastRun).toLocaleString() : 'Never'}`);

    if (newUrls.length === 0) {
      console.log('\n✅ No new content to submit - all URLs are up to date!');
      if (IS_CI) {
        console.log('🔄 This is expected after deployments with no new content');
      }
      return;
    }

    // Step 4: Validate deployment is accessible (more important in CI)
    if (IS_CI) {
      console.log('\n🔍 Validating deployment accessibility...');
    }
    const keyValid = await validateKeyFile();

    // Step 5: Submit new URLs
    console.log(`\n📤 Submitting ${newUrls.length} new URLs to IndexNow...`);
    const result = await submitToIndexNow(newUrls);

    // Step 6: Update state
    const newState = updateState(posts, result.urls);
    saveState(newState);

    console.log('\n🎉 IndexNow incremental submission completed!');
    console.log(`📈 Submitted ${result.submitted} new URLs for instant indexing`);

    if (IS_CI) {
      console.log('🔄 Search engines will be notified of new content within minutes');
      console.log('📊 State file updated for next incremental run');
    }

    // Return detailed results for CI logging
    if (IS_CI && result.submitted > 0) {
      console.log('\n📋 Submitted URLs:');
      result.urls.slice(0, 10).forEach((url, i) => {
        console.log(`  ${i + 1}. ${url}`);
      });
      if (result.urls.length > 10) {
        console.log(`  ... and ${result.urls.length - 10} more URLs`);
      }
    }

    // Return success for CI/automation
    process.exit(0);

  } catch (error) {
    console.error('\n💥 IndexNow incremental submission failed:', error.message);
    if (IS_CI) {
      console.error('🔧 This deployment will complete, but search indexing may be delayed');
      console.error('💡 The next successful run will catch any missed URLs');
    }
    process.exit(1);
  }
}

// Export functions for testing
export {
  loadState,
  saveState,
  loadPosts,
  detectNewUrls,
  submitToIndexNow,
  validateKeyFile
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}