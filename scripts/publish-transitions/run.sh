#!/bin/bash

cd `dirname $0`

NOW_VERSION=`date '+%Y.%-m.%-d'`
SERVER=${1-"https://glsl.io"}
VERSION=${2-$NOW_VERSION}

cd target || exit 1

echo reset repository...
git fetch || exit 2
git checkout master || exit 2
git reset --hard origin/master || exit 2

echo versionning...$VERSION
npm version $VERSION || exit 6

echo retrieve and compile transitions...
rm -f transitions.glsl transitions.min.glsl
curl $SERVER/api/snapshots/transitions?minified=false > transitions.json || exit 3
curl $SERVER/api/snapshots/transitions?minified=true > transitions.min.json || exit 3

node test.js || exit 4

npm install || exit 5
npm run build || exit 5

echo add files...
git add transitions.json transitions.min.json build/ || exit 6
git add package.json || exit 7

echo publish...
npm publish || exit 8
git commit -m"$VERSION" && 
git tag $VERSION &&
git push origin master &&
git push origin $VERSION || exit 9

echo done.
