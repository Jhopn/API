import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { PostController } from "../controllers/PostController";

const router = Router();
const postController = new PostController();

router.post("/post", authMiddleware, postController.store);
router.get("/getpost", authMiddleware, postController.index);
router.get("/stripepost", authMiddleware, postController.stripePosts);
router.get("/stripeusers", authMiddleware, postController.stripeUsers);

export { router as RouterPost };
