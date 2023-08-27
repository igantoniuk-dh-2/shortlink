import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from '../user.dto';
import { LoginUserResult } from '../user.interface';
import { CheckUserService } from './check-user.service';
import { User } from '../user.schema';

@Injectable()
export class LoginUserService extends CheckUserService {
  async login(dto: LoginDto): Promise<LoginUserResult> {
    const { email, password } = dto;
    const user = await this.userModel.findOne({
      email,
      password: this.crypt(password),
    });

    if (!user) throw new HttpException('wrong credentials', 401);

    const userData: Partial<User> = {
      ID: user.ID,
      email: user.email,
      createdAt: user.createdAt,
    };
    return {
      user: this.prepareUser(user),
      jwt: await this.jwtService.signAsync(
        JSON.stringify({ ...userData, ID: user._id }),
      ),
    };
  }
}
