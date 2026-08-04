import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "./request";
import type TestAgent from "supertest/lib/agent";
import type { Test } from "supertest";
import jwt from "jsonwebtoken";

let mongo: any;

declare global {
  var signin: () => string[];
  var request: TestAgent<Test>;
}

global.signin = () => {
  // build a JWT payload. {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object. {jwt: MY_JWT}
  const session = { jwt: token };

  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`session=${base64}`];
};

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
  global.request = request;
}, 60000);

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
