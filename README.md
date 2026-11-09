# Hunters API · PostgreSQL

API REST para administrar personajes de Hunter x Hunter. Es el backend de la app [hunterxhunter](https://github.com/nicolascamargom/hunterxhunter).

Hice la misma API dos veces para comparar una base de datos relacional con una NoSQL:
- [hunters-svc-relational](https://github.com/nicolascamargom/hunters-svc-relational): con PostgreSQL
- [hunters-svc-nosql](https://github.com/nicolascamargom/hunters-svc-nosql): con MongoDB

Esta versión usa **PostgreSQL**.

## Tecnologías
Node.js · Express · PostgreSQL · Swagger UI

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/personajes` | Lista todos los personajes |
| GET | `/api/personajes/:id` | Trae un personaje por su id |
| POST | `/api/personajes` | Crea un personaje |
| PUT | `/api/personajes/:id` | Actualiza un personaje |
| DELETE | `/api/personajes/:id` | Borra un personaje |

Cada personaje tiene: `nombre`, `edad`, `altura`, `peso` e `imageurl`.

La documentación interactiva queda en `http://localhost:8080/api-docs`.

## Cómo correrlo

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y pon tu `DATABASE_URL`.
3. (Opcional) Carga datos de prueba:
   ```bash
   node seed_postgres.js
   ```
4. Arranca el servidor:
   ```bash
   node index.js
   ```
