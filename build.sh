#!/bin/bash
set -e

if [ -d "apps/frontend" ]; then
  cd apps/frontend
  npm install
  npm run build
else
  echo "Error: apps/frontend directory not found"
  exit 1
fi

