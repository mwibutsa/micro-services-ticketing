import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("returns the ticket if the provided id exists", async () => {
  const ticketResponse = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Title",
      price: 20,
    })
    .expect(201);

  const ticket = ticketResponse.body;

  const response = await request
    .get(`/api/tickets/${ticket.id}`)
    .send()
    .expect(200);

  expect(response.body.title).toEqual(ticket.title);
  expect(response.body.price).toEqual(ticket.price);
});
