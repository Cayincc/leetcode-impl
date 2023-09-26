import type { IncomingMessage, ServerResponse } from 'node:http'

import instantiate from '../lib/cpp_lib.mjs'

interface result {
  body: string
  status: number
}

const wasm = await instantiate()

function find_diagonal_order(req: IncomingMessage): result {
  const tmp = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  const mat = new wasm.VectorVectorInt()
  for (const a of tmp) {
    const vec = new wasm.VectorInt()
    for (const v of a) {
      vec.push_back(v)
    }
    mat.push_back(vec)
  }
  const start = performance.now()
  const result = wasm.find_diagonal_order(mat)
  console.log(`wasm: find_diagonal_order took ${performance.now() - start}`)
  const arr = []
  for (let i = 0; i < result.size(); ++i) {
    arr[i] = result.get(i)
  }

  return {
    body: JSON.stringify({
      state: 'success',
      message: 'ok',
      method: 'find_diagonal_order',
      result: arr
    }),
    status: 200
  }
}

function find_diagonal_order2(req: IncomingMessage): result {
  const mat: Int32Array[] = [
    Int32Array.from([1, 2, 3]),
    Int32Array.from([4, 5, 6]),
    Int32Array.from([7, 8, 9])
  ]
  let vec = new wasm.VectorInt()
  const start = performance.now()
  vec = wasm.find_diagonal_order2(mat)
  console.log(`wasm: find_diagonal_order2 took ${performance.now() - start}`)
  const arr = []
  for (let i = 0; i < vec.size(); i++) {
    arr.push(vec.get(i))
  }

  return {
    body: JSON.stringify({
      state: 'success',
      message: 'ok',
      method: 'find_diagonal_order2',
      result: arr
    }),
    status: 200
  }
}

export default function handler(req: IncomingMessage, res: ServerResponse): ServerResponse {
  res.setHeader('Content-Type', 'application/json')
  let r: result
  switch (req.url) {
    case '/':
      r = find_diagonal_order2(req)
      break
    default:
      r = {
        body: '',
        status: 404
      }
      break
  }
  res.writeHead(r.status)
  res.end(r.body)
  return res
}
