#!/bin/bash


# Step 1: Pull the latest changes from the git repository
echo "Pulling latest changes from git..."
git pull origin main

# Step 2: Install the project dependencies
echo "Installing dependencies..."
npm install

# Step 3: Run the production build
echo "Running production build..."
npm run prod

echo "Deployment completed successfully!"