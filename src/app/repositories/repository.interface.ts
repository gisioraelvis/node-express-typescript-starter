/**
 * By using depenency inversion, our controller is loosely coupled
 * with our data access layer and not tighly tied to TypeORM,
 * so down the road if we wanted to switch to a different ORM or
 * maybe just raw SQL queries and ditch the ORM completely,
 * we won’t have to change any logic in our Controller
 * (or anywhere that uses an IRepository interface).
 * We would simply create new implentation of our IRepository and
 * provide the new implementation to the constructor of our controller.
 * Using dependency inversion also makes testing easier.
 * Since we’re able to control the dependencies of our UsersController,
 * we’re able to create a mock repository
 * when isolating and testing our UsersControllers methods.
 */

export interface IRepository<T> {
  findByUserName(username: string): Promise<T | null | undefined>;
  findAll(): Promise<T[]>;
}
