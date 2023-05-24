import { Document } from 'mongoose';

export class Video extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
