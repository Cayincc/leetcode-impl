import { instantiate } from "@/lib/rs_lib.generated.js";
import { ConnInfo } from "$std/http/server.ts";

const wasm = await instantiate();

interface result {
  body: string;
  status: number;
}

function find_diagonal_order(req: Request): result {
  console.log(`${req.method} ${req.url}`);
  const mat: Int32Array[] = [
    Int32Array.from([1, 2, 3]),
    Int32Array.from([4, 5, 6]),
    Int32Array.from([7, 8, 9]),
  ];
  const start = performance.now();
  const res: Int32Array = wasm.find_diagonal_order(mat);
  console.log(`wasm: find_diagonal_order took ${performance.now() - start}`);
  return {
    body: JSON.stringify({
      "state": "success",
      "message": "ok",
      "method": "find_diagonal_order",
      "result": res,
    }),
    status: 200,
  };
}

const hanlder = (req: Request, connInfo: ConnInfo): Response => {
  const url = new URL(req.url);
  console.log(`${url.pathname}`);
  let r: result;
  switch (url.pathname) {
    case "/":
      r = find_diagonal_order(req);
      break;
    default:
      r = {
        body: "",
        status: 404,
      };
      break;
  }

  return new Response(r.body, {
    "status": r.status,
    "headers": {
      "Content-Type": "application/json",
    },
  });
};

export default hanlder;
