import express, { Router } from "express";
import { UsersController } from "../controllers";
import { dtoValidationMiddleware } from "../middlewares";
import { UserRegistrationDto } from "../dtos";

const router: Router = express.Router();
const usersController: UsersController = new UsersController();

router.get("/", usersController.getAllUsers);
router.get("/:username", usersController.getByUsername);
router.post(
  "/register",
  dtoValidationMiddleware(UserRegistrationDto),
  usersController.registerUser,
);
router.post("/login", usersController.loginUser);

export const usersRouter: Router = router;
