import { IsEmail, IsString, Matches } from "class-validator";

export class UserRegistrationDto {
  @IsString()
  public username: string;
  @IsString()
  public firstname: string;
  @IsString()
  public lastname: string;
  @IsEmail({}, { message: "$value is not a valid $target" })
  public email: string;
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      "Weak Password: Password should have a min of 8 and 20 characters,at least one uppercase letter, one lowercase letter, one number and one special character",
  })
  public password: string;
}
