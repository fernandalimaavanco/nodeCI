import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "usuarios_db",
});

pool
  .connect()
  .then((client) => {
    console.log("🟢 Conectado ao banco de dados PostgreSQL");
    client.release();
  })
  .catch((err) => console.error("🔴 Erro ao conectar ao banco:", err));
