import { Router, Request, Response, NextFunction } from "express";
import { UsersController } from "../controllers";
import { dtoValidationMiddleware } from "../middlewares";
import { UserLoginDto, UserRegistrationDto } from "../dtos";
import { UsersRepository } from "../repositories";
import { authenticationMiddleware } from "../middlewares";

const router: Router = Router();
const usersRepository: UsersRepository = new UsersRepository();
const usersController: UsersController = new UsersController(usersRepository);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await usersController.getAllUsers(req, res, next);
});

router.post(
  "/signup",
  dtoValidationMiddleware(UserRegistrationDto),
  async (req: Request, res: Response, next: NextFunction) => {
    await usersController.registerUser(req, res, next);
  },
);

router.post(
  "/signin",
  dtoValidationMiddleware(UserLoginDto),
  async (req: Request, res: Response, next: NextFunction) => {
    await usersController.loginUser(req, res, next);
  },
);

router.post(
  "/updateprofile",
  dtoValidationMiddleware(UserRegistrationDto),
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticationMiddleware(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    await usersController.updateUser(req, res, next);
  },
);

export const usersRouter: Router = router;
