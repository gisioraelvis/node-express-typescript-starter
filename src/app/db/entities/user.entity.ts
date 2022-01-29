import { Column, Entity } from "typeorm";
import { SharedEntity } from "./shared.entity";

@Entity()
export class User extends SharedEntity {
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
