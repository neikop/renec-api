import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { VideosController } from './videos.controller';
import { videosProviders } from './videos.providers';
import { VideosService } from './videos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VideosController],
  providers: [VideosService, ...videosProviders],
})
export class VideosModule {}
