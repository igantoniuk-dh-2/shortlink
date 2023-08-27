import mongoose from 'mongoose';

export class Link {
  ID: string;
  id?: string;
  shortLink: string;
  longLink: string;
  userId: string;
  createdAt: string;
}
export const LinksSchema = new mongoose.Schema({
  ID: String,
  shortLink: String,
  longLink: String,
  userId: String,
  createdAt: String,
});
