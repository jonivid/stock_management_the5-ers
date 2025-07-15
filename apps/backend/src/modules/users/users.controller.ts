import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserDocument } from "./user.schema";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    this.logger.log(
      `Signup request received for email: ${createUserDto.email}`
    );
    try {
      const user = (await this.usersService.createUser(
        createUserDto
      )) as UserDocument;
      this.logger.log(
        `User created successfully: ${user.email} (id: ${user.id})`
      );
      return { id: user.id, email: user.email };
    } catch (error) {
      this.logger.error(
        `Signup failed for email: ${createUserDto.email}`,
        error.stack
      );
      throw error;
    }
  }
}
