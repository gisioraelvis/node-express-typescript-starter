import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET as string);

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, invalid token" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized, no token" });
    return;
  }
};
