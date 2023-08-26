import mongoose from 'mongoose';

export class User {
  ID: string;
  email: string;
  password: string;
  createdAt: string;
}

export const UserSchema = new mongoose.Schema({
  ID: String,
  email: String,
  password: String,
  createdAt: String,
});
