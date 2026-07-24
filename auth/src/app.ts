import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";
import { errorHandler } from "./middlewares/error-handler";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }),
); // not encrypted && only used on https

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(signInRouter);

app.all(/.*/u, async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
