import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../connection/prisma";

type User = {
  id: string;
  name: string;
  email: string;
};

type RequestWithUser = Request & {
  user: string | JwtPayload | User;
};

export class PostController {

  public async index(req: RequestWithUser, res: Response): Promise<Response> {
    try {
      if (req.user && typeof req.user !== 'string' && 'id' in req.user) {
        const { id } = req.user;
        const posts = await prisma.post.findMany({
          where: {
            authorId: id,
          },
        });
        return res.json(posts);
      } else {
        return res.status(400).json({ error: 'Usuário não autenticado ou ID inválido.' });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar post',
        message: error.message,
      });
    }
  }

  public async store(req: RequestWithUser, res: Response): Promise<Response> {
    if (req.user && typeof req.user !== 'string' && 'id' in req.user) {
      const { title } = req.body;
      const { id } = req.user;

      try {
        const post = await prisma.post.create({
          data: {
            title: title,
            authorId: id,
          },
        });
        return res.json(post);
      } catch (error) {
        return res.status(500).json({
          error: 'Erro ao criar post',
          message: error.message,
        });
      }
    } else {
      return res.status(400).json({ error: 'Usuário não autenticado ou ID inválido.' });
    }
  }

  public async stripePosts(req: RequestWithUser, res: Response) {
    try {
      const posts = await prisma.post.findMany();
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar posts',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  public async stripeUsers(req: RequestWithUser, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar usuários',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
