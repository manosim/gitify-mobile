#!/bin/bash

function run-android {
  echo ""
  echo "Starting Emulator - Android"
  echo "$1"
  echo "---"
  if [ -z "$1" ]; then
    echo "No emulator name passed. Using default: Android_6.0."
    emulator -avd Android_6.0
  else
    echo "Running Android Emulator with name $1"
    emulator -avd $1
  fi
}


function run-ios {
  echo ""
  echo "Starting Emulator - iOS"
  echo ""
  open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app
}


if [ "$1" == "android" ]; then
  run-android $2
elif [ "$1" == "ios" ]; then
  run-ios
else
  echo "No arguments passed."
fi
