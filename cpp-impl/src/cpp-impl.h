#pragma once

#include <vector>
#include <string>


#ifdef _WIN32
  #define CPP_IMPL_EXPORT __declspec(dllexport)
#else
  #define CPP_IMPL_EXPORT
#endif

CPP_IMPL_EXPORT void cpp_impl();
CPP_IMPL_EXPORT void cpp_impl_print_vector(const std::vector<std::string> &strings);
CPP_IMPL_EXPORT void testDiagonalTraverse();