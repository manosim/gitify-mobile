#!/bin/bash

function run-android {
  echo ""
  echo "Running - Android"
  echo ""
  react-native run-android
}


function run-ios {
  echo ""
  echo "Running - iOS"
  echo ""
  react-native run-ios
}


if [ "$1" == "android" ]; then
  run-android
elif [ "$1" == "ios" ]; then
  run-ios
else
  echo "No arguments passed."
fi
