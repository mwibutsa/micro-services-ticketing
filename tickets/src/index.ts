import { natsWrapper } from "./nats-wrapper";
import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }

    await natsWrapper.connect(
      "ticketing",
      crypto.randomUUID(),
      "http://nats-svc:4222",
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS Connection closed");
      process.exit();
    });

    process.on("SIGINT", natsWrapper.client.close);
    process.on("SIGTERM", natsWrapper.client.close);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to mongoDB");
    app.listen(3000, () => {
      console.log("Listening on port 3000 !!!!");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
