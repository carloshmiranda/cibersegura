#!/usr/bin/env node

/**
 * IndexNow Automation Test Script
 *
 * Tests the IndexNow automation system by calling the deploy hook endpoint
 * and verifying that new content is properly detected and submitted.
 */

import https from 'https';

const BASE_URL = process.env.SITE_URL || 'https://ciberpme.vercel.app';
const DEPLOY_HOOK_SECRET = process.env.DEPLOY_HOOK_SECRET;

/**
 * Make HTTP request and return JSON response
 */
function makeRequest(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CiberPME-Test-Script/1.0',
        ...headers
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Test the deploy hook health endpoint
 */
async function testDeployHookHealth() {
  console.log('🔍 Testing deploy hook health endpoint...');

  try {
    const response = await makeRequest(`${BASE_URL}/api/deploy-hook`);

    if (response.statusCode === 200) {
      console.log('✅ Deploy hook health check: PASSED');
      console.log(`   Service: ${response.data.service}`);
      console.log(`   Status: ${response.data.status}`);
      return true;
    } else {
      console.log(`❌ Deploy hook health check: FAILED (${response.statusCode})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Deploy hook health check: ERROR - ${error.message}`);
    return false;
  }
}

/**
 * Test the IndexNow deploy status endpoint
 */
async function testIndexNowStatus() {
  console.log('\\n🔍 Testing IndexNow deploy status endpoint...');

  try {
    const response = await makeRequest(`${BASE_URL}/api/indexnow-deploy`);

    if (response.statusCode === 200) {
      console.log('✅ IndexNow status check: PASSED');
      console.log(`   Total URLs: ${response.data.currentStatus.totalUrls}`);
      console.log(`   Total Posts: ${response.data.currentStatus.totalPosts}`);
      console.log(`   Latest Post: ${response.data.currentStatus.latestPost.slug}`);
      console.log(`   Next Action: ${response.data.nextSubmissionWould}`);

      if (response.data.lastSubmission) {
        console.log(`   Last Submission: ${response.data.lastSubmission.timestamp}`);
        console.log(`   URLs Submitted: ${response.data.lastSubmission.submittedUrls.length}`);
      } else {
        console.log('   Last Submission: None (first run)');
      }

      return true;
    } else {
      console.log(`❌ IndexNow status check: FAILED (${response.statusCode})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ IndexNow status check: ERROR - ${error.message}`);
    return false;
  }
}

/**
 * Test the full deploy hook flow
 */
async function testDeployHookFlow() {
  console.log('\\n🚀 Testing deploy hook automation flow...');

  try {
    const headers = {
      'User-Agent': 'vercel-test-trigger'
    };

    if (DEPLOY_HOOK_SECRET) {
      headers['Authorization'] = `Bearer ${DEPLOY_HOOK_SECRET}`;
      console.log('🔐 Using authentication token');
    }

    const response = await makeRequest(`${BASE_URL}/api/deploy-hook`, 'POST', {}, headers);

    if (response.statusCode === 200) {
      console.log('✅ Deploy hook automation: PASSED');
      console.log(`   Message: ${response.data.message}`);

      if (response.data.indexNowResult) {
        console.log(`   URLs Submitted: ${response.data.indexNowResult.urls}`);
        console.log(`   Submission Count: ${response.data.indexNowResult.submitted}`);
        console.log(`   Timestamp: ${response.data.indexNowResult.timestamp}`);
      }

      return true;
    } else {
      console.log(`❌ Deploy hook automation: FAILED (${response.statusCode})`);
      console.log(`   Error: ${response.data.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Deploy hook automation: ERROR - ${error.message}`);
    return false;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🧪 IndexNow Automation Test Suite');
  console.log('=================================\\n');
  console.log(`Testing against: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}\\n`);

  const results = {
    deployHookHealth: false,
    indexNowStatus: false,
    deployHookFlow: false
  };

  // Test 1: Deploy hook health
  results.deployHookHealth = await testDeployHookHealth();

  // Test 2: IndexNow status
  results.indexNowStatus = await testIndexNowStatus();

  // Test 3: Full deploy hook flow
  results.deployHookFlow = await testDeployHookFlow();

  // Summary
  console.log('\\n📊 Test Results Summary');
  console.log('========================');

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;

  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const testName = test.replace(/([A-Z])/g, ' $1').toLowerCase();
    console.log(`   ${status} - ${testName}`);
  });

  // Overall result
  const allPassed = passedTests === totalTests;
  console.log(`\\n🎯 Overall Result: ${allPassed ? '✅ SUCCESS' : '❌ SOME FAILURES'}`);

  if (!allPassed) {
    console.log('\\n💡 Next Steps:');
    console.log('   1. Check Vercel function logs for error details');
    console.log('   2. Verify environment variables are set correctly');
    console.log('   3. Ensure IndexNow key file is accessible');
    console.log('   4. Review INDEXNOW_AUTOMATION.md for setup instructions');
  } else {
    console.log('\\n🎉 IndexNow automation is working correctly!');
    console.log('   You can now set up Vercel deploy hooks to automate submissions.');
  }

  process.exit(allPassed ? 0 : 1);
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch((error) => {
    console.error('\\n💥 Test runner failed:', error.message);
    process.exit(1);
  });
}

export { runTests, testDeployHookHealth, testIndexNowStatus, testDeployHookFlow };