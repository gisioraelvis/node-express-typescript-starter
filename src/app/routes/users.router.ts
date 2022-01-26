import express, { Router } from "express";
import { UsersController } from "../controllers";

const router: Router = express.Router();
const usersController: UsersController = new UsersController();

router.get("/", usersController.getAllUsers);
router.get("/:username", usersController.getByUsername);

export const usersRouter: Router = router;
