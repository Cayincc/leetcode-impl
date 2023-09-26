#!/bin/bash
# Either set EMROOT to your emscripten root folder, or ensure emscripten is setup in your path
# You can trip the emsdk/emsdk_env.sh via or set in your .bash_profile or similar
#  source "...path_to_emscripten.../emsdk/emsdk_env.sh"

#cmake -DCMAKE_TOOLCHAIN_FILE=$EMROOT/cmake/Modules/Platform/Emscripten.cmake ..
rm -rf ./cpp_lib/build/* ./lib/*
cd ./cpp_lib/build
emcmake cmake ..
# cmake -S . -B ./build
cmake --build .