import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/login-user.dto";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    this.logger.log(`Login request received for email: ${loginUserDto.email}`);
    try {
      const result = await this.authService.login(loginUserDto);
      this.logger.log(`Login successful for email: ${loginUserDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Login failed for email: ${loginUserDto.email}`,
        error.stack
      );
      throw error;
    }
  }
}
