import supertest from "supertest";
import { app } from "../../app";

const request = supertest(app);

it("fails when an email that does not exist is supplied", async () => {
  await request
    .post("/api/users/signin")
    .send({ email: "test@gmail.com", password: "anyPassword!" })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "anyPassword!" })
    .expect(201);
  await request
    .post("/api/users/signin")
    .send({ email: "test@gmail.com", password: "fakePassword!" })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "anyPassword!" })
    .expect(201);

  const response = await request
    .post("/api/users/signin")
    .send({ email: "test@gmail.com", password: "anyPassword!" });
  expect(response.get("Set-Cookie")).toBeDefined();
});
