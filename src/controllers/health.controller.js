/**
 * Liveness probe: responde rápido e sem dependências externas.
 * Não consulta banco nem cache de propósito, para não derrubar o pod
 * por causa de uma dependência lenta.
 */
export function getHealth(_req, res) {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
