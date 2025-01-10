# Makefile for deploying a Node.js project

# Default target
all: deploy

# Target to deploy the project
deploy: pull install run

# Target to pull the latest changes from git
pull:   git pull origin main

# Target to install dependencies
install:    npm install

# Target to run the production build
run:    npm run prod

.PHONY: all deploy pull install run