import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(cookieSession({ signed: false, secure: false })); // not encrypted && only used on https

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(signInRouter);

app.all(/.*/u, async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }
    await mongoose.connect("mongodb://auth-mongo-svc:27017/auth");
    console.log("Connected to mongoDB");
    app.listen(3000, () => {
      console.log("Listening on port 3000 !!!!");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
