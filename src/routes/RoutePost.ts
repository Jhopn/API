import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { PostController } from "../controllers/PostController";

const router = Router();
const postController = new PostController();

router.post("/post", authMiddleware, postController.store.bind(postController));
router.get("/getpost", authMiddleware, postController.index.bind(postController));
router.get("/stripepost", authMiddleware, postController.stripePosts.bind(postController));
router.get("/stripeusers", authMiddleware, postController.stripeUsers.bind(postController));

export { router as RouterPost };
