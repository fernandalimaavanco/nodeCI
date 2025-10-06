import express from "express";
import usersRoutes from "./routes/users.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/users", usersRoutes);

app.use(express.static(path.join(__dirname, "public")));

export default app;
