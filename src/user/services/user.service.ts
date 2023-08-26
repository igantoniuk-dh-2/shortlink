import { Injectable } from '@nestjs/common';
import { LoginUserService } from './login-user.service';

@Injectable()
export class UserService extends LoginUserService {}
