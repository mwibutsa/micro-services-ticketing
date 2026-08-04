async function createTickets() {
  await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Title 1",
      price: 20,
    })
    .expect(201);

  await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Title 2",
      price: 10,
    })
    .expect(201);
}

it("can fetch a list of tickets", async () => {
  await createTickets();
  const response = await request.get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(2);
});
