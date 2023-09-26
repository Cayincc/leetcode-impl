#include <fmt/color.h>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    static vector<int> findDiagonalOrder(vector<vector<int>>& mat)
    {
        int m = mat.size();
        int n = mat[0].size();
        vector<int> res, intermediate;
        int r = 0, c = 0;

        for (int d = 0; d < m + n - 1; ++d) {
            if (d < n) {
                r = 0;
                c = d;
            } else {
                r = d - n + 1;
                c = n - 1;
            }
            intermediate.clear();
            while (r < m && c > -1) {
                intermediate.push_back(mat[r][c]);
                ++r;
                --c;
            }
            if (intermediate.size() > 0 && d % 2 == 0) {
                reverse(intermediate.begin(), intermediate.end());
            }
            res.insert(res.end(), intermediate.begin(), intermediate.end());
        }
        return res;
    }
};

int testDiagonalTraverse() {
    vector<vector<int>> mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9},
    };

    fmt::print(fg(fmt::color::green_yellow), "{}\n", fmt::join(Solution::findDiagonalOrder(mat), ", "));
    return 0;
}