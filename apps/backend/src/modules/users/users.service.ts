import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new ConflictException("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, hashedPassword });
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    return isMatch ? user : null;
  }
}
