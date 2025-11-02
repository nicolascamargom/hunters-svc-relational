import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

// Configuración del cliente PostgreSQL
const db = new Client({
  connectionString: process.env.DATABASE_URL, // URL de tu base en Railway o local
  ssl: {
    rejectUnauthorized: false, // necesario para Railway u otros servicios cloud
  },
});

await db.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error al conectar con PostgreSQL:", err));

export default db;
