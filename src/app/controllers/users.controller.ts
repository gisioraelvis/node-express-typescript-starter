import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../repositories";
import { UsersService } from "../services";

const usersRepository: UsersRepository = new UsersRepository();
const usersService: UsersService = new UsersService(usersRepository);

export class UsersController {
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    return await usersService.registerUser(req, res, next);
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    return await usersService.loginUser(req, res, next);
  };

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
