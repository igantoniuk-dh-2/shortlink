import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisProvider {
  private readonly client: Redis;

  constructor(configService: ConfigService) {
    const conf = configService.get('redis');
    this.client = new Redis({
      ...conf,
    });
  }

  redis() {
    return this.client;
  }
  async setexValue(key: string, value: any, time: number): Promise<any> {
    return this.client.setex(key, time, value);
  }

  async deleteValue(key: string): Promise<any> {
    return this.client.del(key);
  }

  async get(key: string): Promise<any> {
    return this.client.get(key);
  }
}
