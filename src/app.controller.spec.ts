import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppController } from './app.controller';
import {
  CreateShortLinkResult,
  DeleteShortLinkResult,
  ReadAllLinksResult,
} from './app.interface';
import { AppService } from './services/app.service';
import { RedisProvider } from './redis/redis.provider';
import { ConfigService } from '@nestjs/config';
jest.mock('@nestjs/mongoose', () => {
  return {
    InjectModel: (some) => {
      return function (some) {};
    },
  };
});
jest.mock('mongoose');
jest.mock('ioredis', () => {
  return {
    Redis: function () {},
  };
});
describe('AppService', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, Model, RedisProvider, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should create link"', async () => {
      const createResult: CreateShortLinkResult = {
        shortLink: 'grrfsr;f;laea',
        id: '312',
      };
      jest
        .spyOn(appController.appService, 'create')
        .mockReturnValue(new Promise((resolve) => resolve(createResult)));

      expect(await appController.create({ url: 'afavaks;' })).toEqual(
        createResult,
      );
    });

    it('should delete short link', async () => {
      const deleteResult: DeleteShortLinkResult = {
        id: 'argfiajdo',
      };

      jest
        .spyOn(appController.appService, 'delete')
        .mockReturnValue(new Promise((resolve) => resolve(deleteResult)));

      expect(await appController.delete({ id: 'affewk' })).toEqual(
        deleteResult,
      );
    });

    it('should read all short link', async () => {
      const readAllResut: ReadAllLinksResult = {
        links: [
          {
            shortLink: 'adwda',
            longLink: 'adwa',
            id: '123',
          },
        ],
      };

      jest
        .spyOn(appController.appService, 'readAll')
        .mockReturnValue(new Promise((resolve) => resolve(readAllResut)));

      expect(await appController.readAll()).toEqual(readAllResut);
    });
  });
});
