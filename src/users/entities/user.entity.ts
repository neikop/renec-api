import { Document } from 'mongoose';

export class User extends Document {
  readonly username: string;
  readonly password: string;
}
