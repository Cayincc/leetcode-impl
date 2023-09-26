cmake_minimum_required(VERSION 3.15)
project(cpp-impl CXX)

set(CMAKE_CXX_STANDARD 20)

find_package(fmt REQUIRED)

add_executable(cpp-impl src/diagonal_traverse.cpp src/cpp-impl.cpp src/main.cpp)

target_link_libraries(cpp-impl fmt::fmt)

install(TARGETS cpp-impl DESTINATION "."
        RUNTIME DESTINATION bin
        ARCHIVE DESTINATION lib
        LIBRARY DESTINATION lib
        )
