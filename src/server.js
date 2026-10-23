import { createApp } from "./app.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`PORT inválida: ${process.env.PORT}`);
}

const server = createApp().listen(port, () => {
  console.log(`API ouvindo em http://localhost:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} recebido, encerrando servidor...`);

  const forceExit = setTimeout(() => {
    console.error("Encerramento forçado após timeout");
    process.exit(1);
  }, 10_000);
  forceExit.unref();

  server.close((err) => {
    clearTimeout(forceExit);
    if (err) {
      console.error("Falha ao encerrar servidor:", err);
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
