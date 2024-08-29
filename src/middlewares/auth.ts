import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../controllers/SinginController";

type RequestWithUser = Request & {
  user?: string | JwtPayload; 
};

export const authMiddleware: RequestHandler = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "O token não foi fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as RequestWithUser).user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Erro ao verificar token",
      message: error.message,
    });
  }
};
