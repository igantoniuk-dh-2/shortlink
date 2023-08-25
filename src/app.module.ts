import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';

import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';
import redisConfig from './config/redis.config';
import mongoConfig from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinksSchema } from './links.schema';

function createEnvPath() {
  let envFilePath = path.resolve(__dirname, '../environment/');

  switch (process.env.NODE_ENV) {
    case 'production':
      envFilePath += `/.env.production`;
      break;
    case 'local':
      envFilePath += `/.env.local`;
      break;
    default:
      envFilePath += `/.env.development`;
      break;
  }

  console.log({ envFilePath });
  return envFilePath;
}

@Module({
  imports: [
    RedisModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: createEnvPath(),
      isGlobal: true,
      load: [authConfig, redisConfig, mongoConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('mongo'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Link.name, schema: LinksSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
