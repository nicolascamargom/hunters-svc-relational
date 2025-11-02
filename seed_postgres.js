import dotenv from "dotenv";
import db from "./db.js"; // ✅ sin llaves, usamos la exportación por defecto

dotenv.config();

const personajes = [
  {
    nombre: "Gon Freecss",
    edad: 12,
    altura: 154,
    peso: 45,
    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN0WnCrv6MFHYVTKzMyRpVIRu_aeEZffPaHQ&s"
  },
  {
    nombre: "Killua Zoldyck",
    edad: 12,
    altura: 158,
    peso: 49,
    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NiiAuGl3Az1Qy0VSW3Tnf3WHjQBVXP_dug&s"
  },
  {
    nombre: "Kurapika",
    edad: 17,
    altura: 171,
    peso: 59,
    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvRc28Wzrz22M79OHI7nJpsfM1Z7Do-BhMQA&s"
  },
  {
    nombre: "Leorio Paradinight",
    edad: 19,
    altura: 193,
    peso: 85,
    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTUklZtDBHwDq6MHXcLiXuXElrRpg9vjGwnA&s"
  },
  {
    nombre: "Hisoka Morow",
    edad: 28,
    altura: 187,
    peso: 91,
    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96hny0Fc8hPqcPkwnIXyyoDPvlFT6f210Kg&s"
  },
  {
    nombre: "Chrollo Lucilfer",
    edad: 26,
    altura: 177,
    peso: 68,
    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGVmehY0PXaDavme9fstkUzjKFKhCfjfCSQ&s"
  }
];

(async () => {
  try {
    console.log("🌍 Conectando a PostgreSQL Railway...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS personajes_rel (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(200) NOT NULL,
        edad INT,
        altura NUMERIC,
        peso NUMERIC,
        imageurl TEXT NOT NULL
      );
    `);
    console.log("✅ Tabla verificada");

    await db.query("DELETE FROM personajes_rel;");
    console.log("🗑️ Datos anteriores eliminados");

    for (const p of personajes) {
      await db.query(
        "INSERT INTO personajes_rel (nombre, edad, altura, peso, imageurl) VALUES ($1, $2, $3, $4, $5)",
        [p.nombre, p.edad, p.altura, p.peso, p.imageurl]
      );
      console.log(`✅ Insertado: ${p.nombre}`);
    }

    const { rows } = await db.query("SELECT COUNT(*) FROM personajes_rel");
    console.log(`📊 Total personajes: ${rows[0].count}`);
  } catch (err) {
    console.error("❌ Error al insertar:", err);
  } finally {
    await db.end();
    console.log("🔌 Conexión cerrada");
  }
})();
