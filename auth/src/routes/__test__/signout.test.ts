import supertest from "supertest";
import { app } from "../../app";

const request = supertest(app);

it("clears the cookie after signing out", async () => {
  await request
    .post("/api/users/signup")
    .send({
      email: "email@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request
    .post("/api/users/signout")
    .send({})
    .expect(204);
  const cookie = response.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Expected cookie but got undefined.");
  }

  expect(cookie[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  );
});

//
