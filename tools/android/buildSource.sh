#!/bin/bash

if [ "$1" = "clear" ];then
    git co head ../../project/android/build.gradle
    git co head ../../project/android/settings.gradle
    git co head ../../project/android/app/build.gradle
else
    cp ./source/build.gradle ../../project/android/build.gradle
    cp ./source/settings.gradle ../../project/android/settings.gradle
    cp ./source/app/build.gradle ../../project/android/app/build.gradle
fi
