import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserDocument } from "./user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = (await this.usersService.createUser(
      createUserDto
    )) as UserDocument;
    return { id: user.id, username: user.username, email: user.email };
  }
}
