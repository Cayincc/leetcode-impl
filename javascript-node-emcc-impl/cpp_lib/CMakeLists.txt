cmake_minimum_required(VERSION 3.15)
project(cpp_lib CXX)


set(C_CXX_SOURCES_DIR "src")

set(OutputExecutable "${CMAKE_PROJECT_NAME}")

set(SOURCE_CXX_SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/${C_CXX_SOURCES_DIR})

set(OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/../../lib)


# Source Files are Curated Here
file(
    GLOB_RECURSE SOURCE_CXX_FILES
    "${SOURCE_CXX_SRC_DIR}/*.cpp"
)

add_executable(${OutputExecutable} ${SOURCE_CXX_FILES})

######################################################################
# Emscripten
######################################################################
if (EMSCRIPTEN)
    
    # Generate an WASM file
    set(CMAKE_EXECUTABLE_SUFFIX, ".mjs")

    # Build Cache: SDL2_mixer, libpng, zlib
#     execute_process(COMMAND "${EMSCRIPTEN_ROOT_PATH}/embuilder${EMCC_SUFFIX}" build sdl2_mixer libpng zlib)
    
    # target_link_options(
    # ${OutputExecutable}
    # PRIVATE
    # -sALLOW_MEMORY_GROWTH=1
    # -sMAX_WEBGL_VERSION=2
    # -sMIN_WEBGL_VERSION=2
    # -sUSE_LIBPNG=1
    # -sUSE_SDL_MIXER=2          # thanks for the s, cstd
    # -sLLD_REPORT_UNDEFINED)
    # set_target_properties(cpp_lib PROPERTIES COMPILE_FLAGS "-Os -s SIDE_MODULE=1")
#     set_target_properties(cpp_lib PROPERTIES COMPILE_FLAGS "-Os -s SIDE_MODULE=1")
    # set_target_properties(cpp_lib PROPERTIES LINK_FLAGS "-Os -s WASM=1 -s SIDE_MODULE=1 -s STANDALONE_WASM --no-entry")
    set_target_properties(cpp_lib PROPERTIES LINK_FLAGS "-O3 --bind -sEXPORT_NAME=instantiate -sEXPORT_ES6=1 -sMODULARIZE=1 -sSTRICT=1 --no-entry")

endif() # Emscripten
message("build path: ${OUTPUT_DIRECTORY}")
set_target_properties(${OutputExecutable}
    PROPERTIES
    ARCHIVE_OUTPUT_DIRECTORY "${OUTPUT_DIRECTORY}"
    LIBRARY_OUTPUT_DIRECTORY "${OUTPUT_DIRECTORY}"
    RUNTIME_OUTPUT_DIRECTORY "${OUTPUT_DIRECTORY}"
)