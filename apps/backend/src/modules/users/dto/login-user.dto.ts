import { IsString } from "class-validator";

export class LoginUserDto {
  @IsString()
  readonly password: string;
}
