#!/usr/bin/env bash
set -ev

# Script for bootstrapping the monorepo into a working state for development.
#
# Runs the following tasks in order:
#   - Install dependencies
#   - Build all internal libs


ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
cd $ROOT_DIR

printf 'Installing dependencies...\n'
yarn install

printf 'Building `@antoree/ant-ui`...\n'
yarn workspace @antoree/ant-ui build

printf 'Building `@antoree/helpers`...\n'
yarn workspace @antoree/helpers build

echo 'Done!'
