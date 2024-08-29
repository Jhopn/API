import { Router } from "express";
import { RegisterController } from "../controllers/RegisterController";
import { SingInController } from "../controllers/SinginController";

const router = Router();
const registerController = new RegisterController();
const singInController = new SingInController();

router.post("/register", registerController.registerUser);
router.post("/login", singInController.singIn);

export { router as RouterUser };
