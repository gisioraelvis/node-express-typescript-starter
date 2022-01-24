import express, { Request, Response, Router, NextFunction } from "express";
import { UsersController } from "../controllers";
// import { IRepository, UsersRepository } from "../repositories";
// import { User } from "../data";

const router: Router = express.Router();
const usersController: UsersController = new UsersController();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await usersController.getAllUsers(req, res, next);
});

export const usersRouter: Router = router;
