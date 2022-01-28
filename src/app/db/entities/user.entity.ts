import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  public username: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
