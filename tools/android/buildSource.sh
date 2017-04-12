#!/bin/bash

if [ "$1"="" -o "$1" = "-h" -o "$1" = "--help" ];then
    echo "buildSource.sh [-h|--help|-c|--clear|-r|--run]"
    echo
    echo "di ../../project/android/build.gradle ./source/build.gradle"
    echo "di ../../project/android/settings.gradle ./source/settings.gradle"
    echo "di ../../project/android/app/build.gradle ./source/app/build.gradle"
    echo
elif [ "$1" = "-c" -o "$1" = "--clear" ];then
    git co head ../../project/android/build.gradle
    git co head ../../project/android/settings.gradle
    git co head ../../project/android/app/build.gradle
elif [ "$1" = "-r" -o "$1" = "--run" ];then
    cp ./source/build.gradle ../../project/android/build.gradle
    cp ./source/settings.gradle ../../project/android/settings.gradle
    cp ./source/app/build.gradle ../../project/android/app/build.gradle
fi
