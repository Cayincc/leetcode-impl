import { Server } from "$std/http/server.ts";

import handler from "@/src/rotues.ts";
// console.log(import.meta.resolve("@/certs/key.pem"));

// const key = await Deno.readTextFile(
//   import.meta.resolve("@/certs/key.pem").replace("file://", ""),
// );
// const certs = await Deno.readTextFile(
//   import.meta.resolve("@/certs/cert.pem").replace("file://", ""),
// );

const hostname = "127.0.0.1";
const port = 8989;

const server = new Server({
  hostname: hostname,
  port: port,
  handler: handler,
});
console.log(`Http websever runing. Access it at: http://${hostname}:${port}`);
// await server.listenAndServeTls(
//   import.meta.resolve("@/certs/rsa/cert.pem").replace("file://", ""),
//   import.meta.resolve("@/certs/rsa/pkcs8_key.pem").replace("file://", ""),
// );
await server.listenAndServe();
