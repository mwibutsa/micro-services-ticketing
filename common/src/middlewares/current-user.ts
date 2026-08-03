import { Request, Response, NextFunction } from 'express';

export interface CurrentUser {
  id: string;
  email: string;
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  next();
};
