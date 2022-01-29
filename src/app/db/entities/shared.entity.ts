import { PrimaryGeneratedColumn } from "typeorm";

export abstract class SharedEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
