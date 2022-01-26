import { Request, Response, NextFunction } from "express";
import { IRepository } from "../repositories";
import { User } from "../data";
import { CreateLog } from "../utils";

export class UsersService {
  private readonly _repository: IRepository<User>;

  constructor(repository: IRepository<User>) {
    this._repository = repository;
  }

  public async getByUsername(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { username } = req.params;
    try {
      const user = await this._repository.findByUserName(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    return await this._repository
      .findAll()
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(500).send({ error: error }));
  }
}
