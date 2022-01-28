import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../repositories";
export class UsersService {
  private readonly _repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this._repository = repository;
  }

  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const userExists = await this._repository.findByUserName(
        req.body.username,
      );
      if (userExists) {
        return res
          .status(409)
          .json({ error: "username is taken, try a different username" });
      }

      const emailExists = await this._repository.findByEmail(req.body.email);
      if (emailExists) {
        return res.status(409).json({ error: "email is already registered" });
      }

      await this._repository.registerUser(req.body);

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      const user = await this._repository.findByUserName(req.body.username);
      if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

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
      return res.status(500).json({ error: error });
    }
  }

  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const users = await this._repository.findAll();
      // if users is empty array
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
