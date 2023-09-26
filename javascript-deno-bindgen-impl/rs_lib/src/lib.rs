use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

#[wasm_bindgen]
pub fn find_diagonal_order(mat: Vec<js_sys::Int32Array>) -> Vec<i32>
{
  let m: usize = mat.len();
  let n: usize = mat[0].length() as usize;
  let mut res: Vec<i32> = vec![];
  let mut intermediate: Vec<i32> = vec![];
  let mut r: usize;
  let mut c: usize;
  
  for d in 0..(m + n - 1) {
    if d < m {
      r = 0;
      c = d;
    } else {
      r = d - n + 1;
      c = n - 1;
    }
    intermediate.clear();
    while r < m {
      intermediate.push(mat[r].get_index(c as u32));
      if c == 0 {
        break;
      }
      r += 1;
      c -= 1;
    }
    if intermediate.len() > 1 && d % 2 == 0 {
      intermediate.reverse();
    }
    res.append(&mut intermediate);
  }
  return res;
}