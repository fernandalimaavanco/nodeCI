import app from "./app.js";
import { pool } from "./db.js";
import { runMigrations } from "./db/migrate.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await runMigrations();
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
  }
};

start();
