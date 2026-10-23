import express from "express";

import { healthRouter } from "./routes/health.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errors.js";

/**
 * Monta a aplicação Express sem abrir porta, para permitir teste isolado.
 */
export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  app.use("/health", healthRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
