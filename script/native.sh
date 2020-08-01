#!/usr/bin/env bash

info="\033[0;46m"
warn="\033[30;43m"
clearstyle="\033[0m"

log() {
    echo -e "\n$1 $2 $clearstyle"
}

# Updating ios native dependency
log $info '[NOTE] Updating ios native dependency...'
cd ios
pod install

# Updating android native dependency
log $info '[NOTE] Updating android native dependency...'
cd ../android
yarn jetify
./gradlew clean

# Done
echo '- Script done -'
