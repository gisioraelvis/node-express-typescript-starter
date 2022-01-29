import { IsString, Matches } from "class-validator";

export class UserLoginDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}
