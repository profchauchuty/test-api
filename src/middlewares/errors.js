export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Rota não encontrada",
    },
  });
}

// O Express só reconhece o handler de erro com os quatro parâmetros.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const status = err.status ?? err.statusCode ?? 500;

  if (status >= 500) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "Erro não tratado",
        method: req.method,
        path: req.originalUrl,
        error: err.message,
        stack: err.stack,
      }),
    );
  }

  res.status(status).json({
    error: {
      code: err.code ?? (status >= 500 ? "INTERNAL_ERROR" : "BAD_REQUEST"),
      message: status >= 500 ? "Erro interno" : err.message,
    },
  });
}
