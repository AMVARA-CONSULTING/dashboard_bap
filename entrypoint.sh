#!/bin/sh

# install git
# apk add git

# deactivate questions
export NG_CLI_ANALYTICS=ci

echo "removing node_modules"
rm -rf node_modules && echo OK || echo failed

echo "rm -rf /root/.npm"
rm -rf /root/.npm && echo OK || echo failed

echo "------ npm version"
npm version

echo "------ npm cache verify"
npm cache verify

# echo "------ npm cache clean"
# npm cache clean

echo "doing npm ci"
time npm ci --timing --loglevel verbose && echo OK || exit 2

# serve the page
npx ng serve --host 0.0.0.0 --disable-host-check
