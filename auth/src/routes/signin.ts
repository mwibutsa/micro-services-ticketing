import { Router } from "express";
import type { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@mwibutsa/common";
import { BadRequestError } from "@mwibutsa/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password,
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        email,
        id: existingUser.id,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      ...req.session,
      jwt: userJwt,
    };
    res.send(existingUser);
  },
);

export { router as signInRouter };
