#include "cpp_lib.h"

std::vector<int> find_diagonal_order(std::vector<std::vector<int>> mat)
{
    int m = mat.size();
    int n = mat[0].size();

    // EM_ASM({
    //     console.log("Hello World!: " + $0);
    // }, m);
    emscripten_console_log(("Hello World" + std::to_string(m)).c_str());

    std::vector<int> res;
    std::vector<int> intermediate;
    int r, c;
    for (int d = 0; d < m + n - 1; d++)
    {
        if (d < n) {
            r = 0;
            c = d;
        } else {
            r = d - n + 1;
            c = n - 1;
        }
        intermediate.clear();
        while (r < m && c > -1)
        {
            intermediate.push_back(mat[r][c]);
            ++r;
            --c;
        }
        if (intermediate.size() > 1 && d % 2 == 0) {
            std::reverse(intermediate.begin(), intermediate.end());
        }
        res.insert(res.end(), intermediate.begin(), intermediate.end());
    }
    return res;
}

std::vector<int> find_diagonal_order2(const emscripten::val &mat)
{
    int m = mat["length"].as<int>();
    int n = mat[0]["length"].as<int>();

    std::vector<int> res, intermideate;
    int r, c;

    for (int d = 0; d < (m + n - 1); d++)
    {
        if (d < n)
        {
            r = 0;
            c = d;
        } else {
            r = d - n + 1;
            c = n - 1;
        }

        intermideate.clear();
        while (r < m && c > -1)
        {
            intermideate.push_back(mat[r][c].as<int>());
            ++r;
            --c;
        }
        
        if (intermideate.size() > 1 && d % 2 == 0)
        {
            std::reverse(intermideate.begin(), intermideate.end());
        }
        res.insert(res.end(), intermideate.begin(), intermideate.end());
    }
    
    return res;
    
    // std::vector<float> floatArray;
    // floatArray.resize(length);
    // auto memory = emscripten::val::module_property("HEAPU8")["buffer"];
    // auto memoryView = floatArrayObject["constructor"].new_(memory, reinterpret_cast<uinptr_t>(floatArray.data()), length);
    // memoryView.call<void>("set", floatArrayObject);

    // for (auto &floatValue: floatArray)
    // {
    //     std::cout << floatValue << ", ";
    // }
    // std::cout << std::endl;
}

EMSCRIPTEN_BINDINGS(module) {
    emscripten::function("find_diagonal_order", &find_diagonal_order);
    emscripten::function("find_diagonal_order2", &find_diagonal_order2);

    emscripten::register_vector<int>("VectorInt");
    emscripten::register_vector<std::vector<int>>("VectorVectorInt");
}