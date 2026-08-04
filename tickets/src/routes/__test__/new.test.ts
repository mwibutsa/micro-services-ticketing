import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request.post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by signed-in users", async () => {
  await request.post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const cookie = global.signin();
  const response = await request
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Title",
      price: -10,
    })
    .expect(400);

  await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Title",
    })
    .expect(400);
});

it("creates a ticket if valid title and price are provided", async () => {
  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  const response = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Title",
      price: 20,
    });
  expect(response.status).toEqual(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
