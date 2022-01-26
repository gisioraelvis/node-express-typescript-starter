import { Request, Response, NextFunction } from "express";
import { User } from "../data";
import { IRepository, UsersRepository } from "../repositories";
import { UsersService } from "../services";

const usersRepository: IRepository<User> = new UsersRepository();
const usersService: UsersService = new UsersService(usersRepository);

export class UsersController {
  public getByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    await usersService.getByUsername(req, res, next);
  };

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    await usersService.getAllUsers(req, res, next);
  };
}
