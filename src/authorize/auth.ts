import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
  userData?: { [key: string]: any };
}

export const middleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      throw new Error("Token not found");
    }

    const token = req.cookies.token;

    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as { [key: string]: any };

    req.userData = decodedToken;

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed";
    res.status(401).json({
      error: "Unauthorized",
      message: errorMessage,
    });
  }
};
