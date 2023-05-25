import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Video } from './schemas/video.schema';

@Processor('video')
export class VideosProcessor {
  private readonly logger = new Logger(VideosProcessor.name);

  @Process('create')
  handleTranscode(job: Job<Video>) {
    this.logger.debug('Start transcoding...');
    const { data: video } = job;
    this.logger.debug(video);
    this.logger.debug('Transcoding completed');
  }
}
