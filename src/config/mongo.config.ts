import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
}));
