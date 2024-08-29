import { Request, Response } from "express";
import { prisma } from "../connection/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SECRET_KEY =
  "1e186e342272db5cdcd4ead6e1e05d55896de5ca0790a9720df5b7c6fca91c07";

export class SingInController{
  public async singIn(req: Request, res: Response){
  try {
    const { email, password } = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) return res.json({ erro: "Credenciais inválidas" });

    const isValidPassword = await bcrypt.compare(password, userExist.password);

    if (!isValidPassword) return res.json({ erro: "Credenciais inválidas" });

    const token = jwt.sign(
      {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
      SECRET_KEY
    );

    return res.json(token);
  } catch (error) {
    return res.json({
      error: "Erro ao logar usuário",
      message: error,
    });
  }
}
};
