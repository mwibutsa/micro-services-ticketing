it("responds with details about the current user", async () => {
  const cookie = await global.signin();
  if (!cookie) {
    throw new Error("Expected cookie but got undefined.");
  }

  const response = await global.request
    .get("/api/users/current-user")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await global.request
    .get("/api/users/current-user")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
