import { Router } from "express";
import db from "../db.js";

const router = Router();

// ✅ Obtener todos los personajes
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM personajes_rel ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener personajes:", error);
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// ✅ Crear un nuevo personaje
router.post("/", async (req, res) => {
  try {
    const { nombre, edad, altura, peso, imageurl } = req.body;
    const result = await db.query(
      "INSERT INTO personajes_rel (nombre, edad, altura, peso, imageurl) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, edad, altura, peso, imageurl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al crear personaje:", error);
    res.status(500).json({ error: "Error al crear personaje" });
  }
});

// ✅ Actualizar un personaje existente
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, altura, peso, imageurl } = req.body;
    const result = await db.query(
      "UPDATE personajes_rel SET nombre=$1, edad=$2, altura=$3, peso=$4, imageurl=$5 WHERE id=$6 RETURNING *",
      [nombre, edad, altura, peso, imageurl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al actualizar personaje:", error);
    res.status(500).json({ error: "Error al actualizar personaje" });
  }
});

// ✅ Eliminar un personaje
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM personajes_rel WHERE id=$1", [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error("❌ Error al eliminar personaje:", error);
    res.status(500).json({ error: "Error al eliminar personaje" });
  }
});

export default router;
