import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { User, UserDocument } from "../users/user.schema";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    this.logger.log(`Validating user: ${email}`);
    return this.usersService.validateUser(email, password);
  }

  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Attempting login for email: ${loginUserDto.email}`);
    const user = (await this.validateUser(
      loginUserDto.email,
      loginUserDto.password
    )) as UserDocument;
    if (!user) {
      this.logger.warn(`Invalid credentials for email: ${loginUserDto.email}`);
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    this.logger.log(`Login successful for user: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email },
    };
  }
}
