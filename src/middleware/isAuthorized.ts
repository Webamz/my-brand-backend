import { NextFunction, Response, Request } from "express";

export interface CustomRequest extends Request {
  userData?: {
    userId: string;
    role: string;
    isAdmin: "admin";
    isUser: "user";
  };
}

export const isAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.userData && req.userData.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Authentication failed. User is not an admin.",
    });
  }
};

export const isUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.userData && req.userData.role === "user") {
    next();
  } else {
    res.status(403).json({
      message: "Authentication failed. Not a user",
    });
  }
};

export const isAuthorized = {
  isAdmin,
  isUser,
};

export default isAuthorized;
