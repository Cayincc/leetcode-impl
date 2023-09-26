import fs from "node:fs"
const path = await import.meta.resolve("#zig_lib/zig-out/lib/zig_lib.wasm")

const wasm = await WebAssembly.instantiate(
    new Uint8Array(fs.readFileSync(path)),
    {
        env: {
            print: (result) => { console.log(`The result is ${result}`); }
        }
    })


Bun.serve(
    {
        port: 8989,
        hostname: "127.0.0.1",
        fetch(req: Request) {
            const res = wasm.instance.exports.find_dignoal_order();
            console.log(res);
            return new Response("Bun!");
        }
    }
)