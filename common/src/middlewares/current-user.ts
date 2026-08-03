import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser | null;
      session?: { jwt?: string } | null;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as CurrentUser;
    req.currentUser = payload;
  } catch (err) {
    req.session = null;
  }

  next();
};
