#!/usr/bin/env bash
set -e
echo "Start server repo..."

BRANCH=${1:-dev}

./scripts/server-pull.sh $BRANCH
cd ../server
npm run build
npm run start