# test-api

API mínima em Express (ESM) com apenas uma rota de health.

## Requisitos

- Node.js >= 20

## Uso

```bash
npm install
npm run dev    # com --watch
npm start      # produção
npm test       # node:test
```

Servidor em `http://localhost:3000` (configurável via `PORT`).

## Endpoints

| Método | Rota      | Descrição                  |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Liveness probe da API      |

```bash
curl http://localhost:3000/health
```

```json
{
  "status": "ok",
  "uptime": 1.23,
  "timestamp": "2026-10-23T12:00:00.000Z"
}
```

## Estrutura

```
src/
├── app.js                        # monta o Express (sem abrir porta)
├── server.js                     # listen + graceful shutdown
├── routes/health.routes.js       # definição da rota
├── controllers/health.controller.js
└── middlewares/errors.js         # 404 e handler de erro central
test/health.test.js
```
