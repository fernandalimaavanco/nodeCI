import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  const migrationPath = path.join(__dirname, "sql_migrations/init.sql");
  const sql = readFileSync(migrationPath, "utf-8");
  await pool.query(sql);
}
