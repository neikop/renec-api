import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosController } from './videos.controller';
import { VideosProcessor } from './videos.processor';
import { VideosService } from './videos.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    BullModule.registerQueue({ name: 'video' }),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideosProcessor],
})
export class VideosModule {}
