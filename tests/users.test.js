import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db.js";
import { runMigrations } from "../src/db/migrate.js";
import http from "http";

let server;

beforeAll(async () => {

  await runMigrations();
  await pool.query("DELETE FROM users;");

  server = http.createServer(app);
  server.listen(0); 
});

afterAll(async () => {

  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

describe("Testes da API de usuários", () => {
  test("POST /users - deve criar um novo usuário", async () => {
    const res = await request(server)
      .post("/users")
      .send({ nome: "Felipe", email: "felipe@test.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe("Felipe");
  });

  test("GET /users - deve listar os usuários", async () => {
    const res = await request(server).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
