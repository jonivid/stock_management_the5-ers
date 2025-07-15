import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    this.logger.log(`Checking if user exists: ${email}`);
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      this.logger.warn(`User already exists: ${email}`);
      throw new ConflictException("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, hashedPassword });
    this.logger.log(`Creating new user: ${email}`);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Finding user by email: ${email}`);
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.findByEmail(email);
    if (!user) {
      this.logger.warn(`User not found: ${email}`);
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (isMatch) {
      this.logger.log(`Password match for user: ${email}`);
      return user;
    } else {
      this.logger.warn(`Invalid password for user: ${email}`);
      return null;
    }
  }
}
