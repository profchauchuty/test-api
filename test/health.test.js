import assert from "node:assert/strict";
import test, { after, before } from "node:test";

import { createApp } from "../src/app.js";

let server;
let baseUrl;

before(async () => {
  server = createApp().listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(
  () =>
    new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    }),
);

test("GET /health responde 200 com status ok", async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.equal(body.status, "ok");
  assert.equal(typeof body.uptime, "number");
  assert.ok(!Number.isNaN(Date.parse(body.timestamp)));
});

test("rota inexistente responde 404 padronizado", async () => {
  const response = await fetch(`${baseUrl}/nao-existe`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: { code: "NOT_FOUND", message: "Rota não encontrada" },
  });
});
