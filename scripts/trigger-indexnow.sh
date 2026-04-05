#!/bin/bash

# Script to trigger IndexNow URL submission after deployment
# Usage: ./scripts/trigger-indexnow.sh [base_url]
# Example: ./scripts/trigger-indexnow.sh https://ciberpme.vercel.app

# Default URL if not provided
BASE_URL="${1:-https://ciberpme.vercel.app}"

echo "Triggering IndexNow submission for $BASE_URL..."

# Trigger IndexNow submission
RESPONSE=$(curl -s -X POST "$BASE_URL/api/indexnow-submit" \
  -H "Content-Type: application/json" \
  -w "HTTPSTATUS:%{http_code}")

HTTP_STATUS=$(echo "$RESPONSE" | grep -o 'HTTPSTATUS:[0-9]*' | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed -E 's/HTTPSTATUS:[0-9]*$//')

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ IndexNow submission successful!"
    echo "$BODY" | grep -o '"submitted":[0-9]*' | cut -d: -f2 | sed 's/^/URLs submitted: /'
else
    echo "❌ IndexNow submission failed with status: $HTTP_STATUS"
    echo "Response: $BODY"
    exit 1
fi