import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  auth: process.env.JWT_SERCET,
}));
