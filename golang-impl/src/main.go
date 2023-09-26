package main

import (
	"example.com/m/v2/src/leetcode"
	"fmt"
)

func main() {
	mat := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	res := leetcode.FindDiagonalOrder(mat)
	fmt.Printf("%v\n", res)
}
