#!/usr/bin/env node

/**
 * IndexNow Batch URL Submission Script
 *
 * Submits all site URLs to IndexNow API for instant search engine indexing.
 * Supports Bing, Yandex, and other IndexNow compatible search engines.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://ciberpme.vercel.app';
const INDEXNOW_KEY = 'fc431a309850fb7ff6682a95bee49ba3';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

// All URLs to submit (extracted from sitemap structure)
const URLS_TO_SUBMIT = [
  '',                                          // Homepage
  '/blog',                                     // Blog listing
  '/recursos',                                 // Resources page
  '/faq',                                      // FAQ page
  // Blog posts (these will be dynamically loaded from posts.ts)
  '/blog/nis2-cadeia-fornecimento-pme',
  '/blog/nis2-entrou-em-vigor',
  '/blog/nis2-portugal-guia-pme',
  '/blog/melhores-ferramentas-ciberseguranca-pmes-2026',
  '/blog/checklist-nis2-conformidade',
  '/blog/nis2-portugal-o-que-pmes-precisam-saber',
  '/blog/10-ameacas-ciberseguranca-pmes-portuguesas',
  '/blog/guia-rgpd-pequenas-empresas-portugal',
  '/blog/proteger-empresa-contra-phishing',
  '/blog/nis2-o-que-muda-3-abril-2026',
  '/blog/nis2-vs-rgpd-diferencas',
  '/blog/registo-cncs-nis2-guia-completo'
];

/**
 * Load URLs dynamically from posts.ts if available
 */
async function loadPostUrls() {
  try {
    const postsPath = path.join(__dirname, '..', 'src', 'lib', 'posts.ts');

    if (!fs.existsSync(postsPath)) {
      console.log('⚠️  posts.ts not found, using static URL list');
      return URLS_TO_SUBMIT;
    }

    // Read and parse posts.ts to extract slugs
    const content = fs.readFileSync(postsPath, 'utf8');
    const slugMatches = content.match(/slug:\s*"([^"]+)"/g) || [];

    const postSlugs = slugMatches
      .map(match => match.replace(/slug:\s*"([^"]+)"/, '$1'))
      .filter(slug => slug !== 'string'); // Filter out TypeScript interface definition

    console.log(`📄 Found ${postSlugs.length} blog posts in posts.ts`);

    // Build complete URL list
    const baseUrls = ['', '/blog', '/recursos', '/faq'];
    const blogUrls = postSlugs.map(slug => `/blog/${slug}`);

    return [...baseUrls, ...blogUrls];
  } catch (error) {
    console.error('❌ Error loading posts:', error.message);
    return URLS_TO_SUBMIT;
  }
}

/**
 * Submit URLs to IndexNow API
 */
async function submitToIndexNow(urls) {
  const fullUrls = urls.map(path => SITE_URL + path);

  const payload = {
    host: SITE_URL.replace('https://', ''),
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: fullUrls
  };

  console.log(`🔄 Submitting ${fullUrls.length} URLs to IndexNow...`);
  console.log('📋 URLs:', fullUrls.map(url => `  - ${url}`).join('\n'));

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
        'User-Agent': 'CiberPME-IndexNow-Bot/1.0'
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
          console.log(`📝 Response: ${responseData || 'No response body'}`);
          resolve({ statusCode, response: responseData });
        } else {
          console.log(`⚠️  IndexNow submission completed with status: ${statusCode}`);
          console.log(`📝 Response: ${responseData}`);
          resolve({ statusCode, response: responseData });
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
 * Validate IndexNow key accessibility
 */
async function validateKeyFile() {
  console.log('🔑 Validating IndexNow key file...');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: SITE_URL.replace('https://', ''),
      path: `/${INDEXNOW_KEY}.txt`,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 && data.trim() === INDEXNOW_KEY) {
          console.log('✅ IndexNow key file is accessible and valid');
          resolve(true);
        } else {
          console.error(`❌ IndexNow key validation failed. Status: ${res.statusCode}, Content: ${data}`);
          reject(new Error('Key validation failed'));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error validating key file:', error.message);
      reject(error);
    });

    req.end();
  });
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting IndexNow batch URL submission...\n');

  try {
    // Step 1: Validate key file
    await validateKeyFile();

    // Step 2: Load URLs
    const urls = await loadPostUrls();
    console.log(`📊 Total URLs to submit: ${urls.length}\n`);

    // Step 3: Submit to IndexNow
    const result = await submitToIndexNow(urls);

    console.log('\n🎉 IndexNow batch submission completed successfully!');
    console.log(`📈 Submitted ${urls.length} URLs for instant indexing`);

    // Return success for CI/automation
    process.exit(0);

  } catch (error) {
    console.error('\n💥 IndexNow submission failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { submitToIndexNow, loadPostUrls, validateKeyFile };