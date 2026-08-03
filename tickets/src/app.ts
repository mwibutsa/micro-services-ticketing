import express from "express";
import { errorHandler } from "@mwibutsa/common";
import cookieSession from "cookie-session";
import { NotFoundError } from "@mwibutsa/common";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }),
); // not encrypted && only used on https

app.all(/.*/u, async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
