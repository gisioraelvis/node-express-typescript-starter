import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/user.entity";

export class generateAndSeedUsers1643372516801 implements MigrationInterface {
  name = "generateAndSeedUsers1643372516801";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );

    await this.seed();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }

  private async seed(): Promise<void> {
    await getRepository(User).save([
      {
        id: 1,
        username: "jmw5598",
        firstname: "Jason",
        lastname: "White",
        email: "jason@gmail.com",
        password: "password",
      },
      {
        id: 2,
        username: "djt2020",
        firstname: "Daniel",
        lastname: "Townswell",
        email: "daniel@gmail.com",
        password: "password",
      },
      {
        id: 3,
        username: "dlw3512",
        firstname: "Danielle",
        lastname: "Whitemore",
        email: "danielle@gmail.com",
        password: "password",
      },
    ] as User[]);
  }
}
