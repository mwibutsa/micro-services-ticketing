import supertest from "supertest";
import { app } from "../../app";

const request = supertest(app);

it("returns a 201 on successful signup", async () => {
  const response = await request.post("/api/users/signup").send({
    email: "test@test.com",
    password: "P@ssword!1",
  });
  expect(response.status).toBe(201);
  expect(response.body.email).toBe("test@test.com");
});
it("returns a 400 with an invalid email", async () => {
  const response = await request.post("/api/users/signup").send({
    email: "invalid email",
    password: "password",
  });
  expect(response.status).toBe(400);
});

it("returns a 400 with an invalid password", async () => {
  const response = await request.post("/api/users/signup").send({
    email: "mwibutsa@gmail.com",
    password: "p",
  });
  expect(response.status).toBe(400);
});

it("returns a 400 with missing email and password", async () => {
  const response = await request.post("/api/users/signup").send({});
  expect(response.status).toBe(400);
});

it("disallows duplicate emails", async () => {
  await request
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password!1" })
    .expect(201);

  const response = await request
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password!1" });
  expect(response.status).toBe(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "P@ssword!1" });
  expect(response.get("Set-Cookie")).toBeDefined();
});
