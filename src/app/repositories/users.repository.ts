import { getRepository, Repository } from "typeorm";
import { User } from "../db";

export class UsersRepository {
  public async registerUser(user: User): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    return await repository.save(user);
  }

  public async loginUser(user: User): Promise<User | undefined> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ username: user.username });
  }

  public async findByUserName(
    username: string,
  ): Promise<User | null | undefined> {
    const repository: Repository<User> = getRepository(User);

    return await repository.findOne({ username });
  }

  public async findByEmail(email: string): Promise<User | null | undefined> {
    const repository: Repository<User> = getRepository(User);
    return repository.findOne({ email });
  }

  public async findAll(): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);

    return await repository.find();
  }
}
