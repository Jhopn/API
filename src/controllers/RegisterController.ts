import { Request, Response } from "express";
import { prisma } from "../connection/prisma";
import bcrypt from "bcryptjs";

export class RegisterController {
  public async registerUser(req: Request, res: Response){
  try {
    const { name, email, password } = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) return res.status(400).json({ erro: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.json({
      error: "Erro ao registrar usuário",
      message: error,
    });
  }
}
};
