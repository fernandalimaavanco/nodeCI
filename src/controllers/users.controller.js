import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.json(result.rows);
};

export const createUser = async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ error: "Campos obrigatórios" });

  const result = await pool.query(
    "INSERT INTO users (nome, email) VALUES ($1, $2) RETURNING *",
    [nome, email]
  );

  res.status(201).json(result.rows[0]);
};
