import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
