import { getRepository, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { User } from "../data";

export class UsersRepository implements IRepository<User> {
  public async findByUserName(
    username: string,
  ): Promise<User | null | undefined> {
    const repository: Repository<User> = getRepository(User);

    return await repository.findOne({ username });
  }

  public async findAll(): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);

    return await repository.find();
  }
}
