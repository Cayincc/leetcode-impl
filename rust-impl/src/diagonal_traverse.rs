struct Solution {}

impl Solution {
    pub fn find_diagonal_order(mat: Vec<Vec<i32>>) -> Vec<i32>{
        let mut res: Vec<i32> = Vec::new();
        let mut intermediate: Vec<i32> = Vec::new();
        let m: usize = mat.len();
        let n: usize = mat[0].len();
        let (mut r, mut c);
        for d in 0..(m + n - 1) {
            if d < n {
                r = 0;
                c = d;
            } else {
                r = d - n + 1;
                c = n - 1;
            }
            intermediate.clear();
            while r < m {
                intermediate.push(mat[r][c]);
                if c == 0 {
                    break
                }
                c -= 1;
                r += 1;
            }
            if intermediate.len() > 1 && d % 2 == 0 {
                intermediate.reverse();
            }
            res.extend(intermediate.iter());
        }
        return res;
    }
}

pub fn test_find_diagonal_order() {
    let mat: Vec<Vec<i32>> = vec![
        vec![1, 2, 3],
        vec![4, 5, 6],
        vec![7, 8, 9]
    ];
    let res: Vec<i32> = Solution::find_diagonal_order(mat);
    let mut str = String::new();
    for v in res {
        str.push_str(&format!("{}, ", v));
    }
    println!("{}", str.trim_end_matches(", "));
    return;
}