import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Obtener todos
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM personajes_rel ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Crear nuevo
router.post("/", async (req, res) => {
  try {
    const { nombre, edad, altura, peso, imageurl } = req.body;
    const result = await db.query(
      "INSERT INTO personajes_rel (nombre, edad, altura, peso, imageurl) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, edad, altura, peso, imageurl]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Actualizar
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, altura, peso, imageurl } = req.body;
    const result = await db.query(
      "UPDATE personajes_rel SET nombre=$1, edad=$2, altura=$3, peso=$4, imageurl=$5 WHERE id=$6 RETURNING *",
      [nombre, edad, altura, peso, imageurl, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM personajes_rel WHERE id=$1", [id]);
    res.json({ mensaje: "Personaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
