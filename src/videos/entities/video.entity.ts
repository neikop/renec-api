import { Document } from 'mongoose';

export class Video extends Document {
  name: string;
  age: number;
  breed: string;
}
