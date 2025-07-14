import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { User, UserDocument } from "../users/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    return this.usersService.validateUser(username, password);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = (await this.validateUser(
      loginUserDto.username,
      loginUserDto.password
    )) as UserDocument;
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, email: user.email },
    };
  }
}
