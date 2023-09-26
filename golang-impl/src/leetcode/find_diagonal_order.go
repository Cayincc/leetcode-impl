package leetcode

import "sort"

func FindDiagonalOrder(mat [][]int) []int {
	m := len(mat)
	n := len(mat[0])
	var (
		res          []int
		intermediate []int
	)
	var r, c int
	for d := 0; d < m+n-1; d++ {
		if d < n {
			r = 0
			c = d
		} else {
			r = d - n + 1
			c = n - 1
		}
		intermediate = nil
		for r < m && c > -1 {
			intermediate = append(intermediate, mat[r][c])
			r++
			c--
		}
		if len(intermediate) > 1 && d%2 == 0 {
			sort.Sort(sort.Reverse(sort.IntSlice(intermediate)))
		}
		res = append(res, intermediate...)
	}
	return res
}
