import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../repositories";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils";

export class UsersController {
  private readonly _repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this._repository = repository;
  }

  /**
   * @desc Register a new user
   * @route POST users/signup
   * @access Public
   */
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const { username, firstname, lastname, email, password } = req.body;
    try {
      const userExists = await this._repository.findByUserName(username);
      if (userExists) {
        return res
          .status(409)
          .json({ message: "username is taken, try a different username" });
      }

      const emailExists = await this._repository.findByEmail(email);
      if (emailExists) {
        return res.status(409).json({ mesage: "email is already registered" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const userData = {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      };

      await this._repository.registerUser(userData);

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  /**
   * @desc Login a user
   * @route POST users/login
   * @access Public
   */
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      const user = await this._repository.findByUserName(req.body.username);

      if (!user) {
        return res.status(404).json({ message: "Username doesn't exist" });
      }

      const matchPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );

      if (!matchPassword) {
        res.status(401).json({
          message: "Incorrect password",
        });
        return;
      }

      if (user && matchPassword) {
        return res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          token: generateJWT(user),
        });
      }
      return;
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  /**
   * @desc Update a user details
   * @route PUT users/updateprofile
   * @access Private
   */
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      const user = await this._repository.findByUserName(req.body.username);
      if (!user) {
        return res.status(404).json({ message: "Username does't exist" });
      }

      if (user) {
        // if user field was not sent/modified, then don't update it
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password =
          (await bcrypt.hash(req.body.password, 10)) || user.password;

        const updatedUser = await this._repository.updateUser(user);

        return res.status(200).json({
          id: updatedUser.id,
          userName: updatedUser.username,
          email: updatedUser.email,
          token: generateJWT(updatedUser),
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  /**
   * @desc Get all registered users
   * @route GET users
   * @access !
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      const users = await this._repository.findAll();
      // if users is empty array
      if (users.length === 0) {
        return res.status(404).json({ message: "No users registered" });
      }

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
}
