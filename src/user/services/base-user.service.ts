import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import * as crypto from 'node:crypto';
export abstract class BaseUserService {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<User>,
    readonly jwtService: JwtService,
  ) {}

  protected crypt(password: string) {
    return crypto.createHash('sha256').update(password).digest();
  }

  protected prepareUser(user: User) {
    user.password = '';
    return user;
  }
}
