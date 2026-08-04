import express from "express";
import { errorHandler } from "@mwibutsa/common";
import cookieSession from "cookie-session";
import { NotFoundError, currentUser } from "@mwibutsa/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }),
); // not encrypted && only used on https
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all(/.*/u, async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
