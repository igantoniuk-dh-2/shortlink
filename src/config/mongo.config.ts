import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27018`,
}));
