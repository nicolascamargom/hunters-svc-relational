// index.js - Servicio Relacional (PostgreSQL - Neon)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import personajesRouter from "./routes/personajes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Swagger (solo para este microservicio)
const swaggerPath = path.join(__dirname, "./swagger-relacional.yaml");
const swaggerSpec = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Probar conexión con PostgreSQL
db.query("SELECT NOW()")
  .then(() => console.log("✅ Conectado correctamente a PostgreSQL (Neon)"))
  .catch((err) => {
    console.error("❌ Error al conectar a PostgreSQL:", err);
    process.exit(1);
  });

// ✅ Rutas
app.use("/api/personajes", personajesRouter);

app.get("/", (req, res) => {
  res.json({ status: "OK", msg: "Servicio Relacional activo" });
});

// ✅ Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Servicio Relacional corriendo en puerto ${PORT}`)
);
