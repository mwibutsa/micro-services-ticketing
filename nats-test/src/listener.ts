console.clear();
import { TicketCreatedListener } from "./events/ticket-created-listener";
import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", crypto.randomUUID(), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
