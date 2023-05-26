import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop({ required: true })
  url: string;

  @Prop()
  title: string;

  @Prop()
  authorName: string;

  @Prop()
  authorUrl: string;

  @Prop()
  thumbnailUrl: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  createdBy: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
