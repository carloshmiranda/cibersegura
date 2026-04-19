#!/usr/bin/env node

// Test script to simulate frontend impression tracking
// This helps us debug if the issue is frontend or backend

import { setTimeout } from 'timers/promises';

console.log('🧪 Testing impression tracking from frontend perspective...\n');

// Function to simulate the frontend tracking call
async function simulateImpressionTracking() {
  const trackingData = {
    event_type: 'cta_impression',
    article_slug: 'ciberseguranca-restaurantes-cafes-portugal',
    cta_position: 'banner',
    link_id: 'affiliate-banner-blog-ciberseguranca-restaurantes-cafes-portugal',
    destination_url: 'https://wazuh.com/'
  };

  console.log('📡 Sending tracking data:', trackingData);

  try {
    const response = await fetch('http://localhost:3000/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'http://localhost:3000/blog/ciberseguranca-restaurantes-cafes-portugal'
      },
      body: JSON.stringify(trackingData),
      keepalive: true,
    });

    console.log('📊 Response status:', response.status, response.statusText);

    if (response.status === 204) {
      console.log('✅ Tracking call succeeded (204 No Content)');
      return true;
    } else if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Tracking failed with response:', errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Fetch error:', error.message);
    return false;
  }
}

// Test multiple scenarios
async function runTests() {
  // Test 1: Basic impression tracking
  console.log('Test 1: Basic impression tracking');
  await simulateImpressionTracking();

  console.log('\n---\n');

  // Test 2: Check if the CTA stats API returns data
  console.log('Test 2: Check CTA stats');
  try {
    const statsResponse = await fetch('http://localhost:3000/api/cta-stats');
    const statsData = await statsResponse.json();
    console.log('📊 CTA Stats response:', statsData);
  } catch (error) {
    console.error('❌ CTA Stats error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Rapid succession (like real user browsing)
  console.log('Test 3: Multiple impressions in succession');
  for (let i = 0; i < 3; i++) {
    console.log(`Impression ${i + 1}/3`);
    await simulateImpressionTracking();
    await setTimeout(1000);
  }
}

// Wait for dev server to be ready, then run tests
setTimeout(2000).then(runTests).catch(console.error);