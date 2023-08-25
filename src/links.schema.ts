import mongoose from 'mongoose';

export class Link {
  ID: string;
  shortLink: string;
  longLink: string;
}
export const LinksSchema = new mongoose.Schema({
  ID: String,
  shortLink: String,
  longLink: String,
});
