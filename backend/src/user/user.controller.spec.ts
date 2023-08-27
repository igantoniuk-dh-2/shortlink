import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {
  CheckUserResult,
  CreateUserResult,
  LoginUserResult,
} from './user.interface';
import { UserService } from './services/user.service';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
jest.mock('@nestjs/mongoose', () => {
  return {
    InjectModel: (some) => {
      return function (some) {};
    },
  };
});
jest.mock('@nestjs/jwt');
jest.mock('mongoose');
describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, Model<User>, JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should return jwt and profile', async () => {
    const loginResult: CreateUserResult = {
      jwt: 'dawgafe',
      user: {
        ID: 'fa;wefi',
        email: 'email@email.com',
        createdAt: new Date().toISOString(),
      },
    };

    jest
      .spyOn(controller.userService, 'login')
      .mockReturnValue(new Promise((resolve) => resolve(loginResult)));

    expect(
      await controller.login({
        email: loginResult.user.email,
        password: loginResult.user.password,
      }),
    ).toEqual(loginResult);
  });
  it('signup should return jwt and profile', async () => {
    const createResult: LoginUserResult = {
      jwt: 'dawgafe',
      user: {
        ID: 'fa;wefi',
        email: 'email@email.com',
        createdAt: new Date().toISOString(),
      },
    };

    jest
      .spyOn(controller.userService, 'create')
      .mockReturnValue(new Promise((resolve) => resolve(createResult)));

    expect(
      await controller.signup({
        email: createResult.user.email,
        password: createResult.user.password,
      }),
    ).toEqual(createResult);
  });
  it('check should return jwt and profile', async () => {
    const checkResult: CheckUserResult = {
      jwt: 'dawgafe',
      user: {
        ID: 'fa;wefi',
        email: 'email@email.com',
        createdAt: new Date().toISOString(),
      },
    };

    jest
      .spyOn(controller.userService, 'check')
      .mockReturnValue(new Promise((resolve) => resolve(checkResult)));

    expect(await controller.check({ jwt: checkResult.jwt })).toEqual(
      checkResult,
    );
  });
});
