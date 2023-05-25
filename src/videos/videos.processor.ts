import { Process, Processor } from '@nestjs/bull';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Job } from 'bull';
import { Server } from 'socket.io';
import { Video } from './schemas/video.schema';

@WebSocketGateway({ cors: { origin: '*' } })
@Processor('video')
export class VideosProcessor {
  @WebSocketServer()
  server: Server;

  @Process('create')
  handleEmitCreate(job: Job<Video>) {
    this.server.emit('video-create', { video: job.data });
  }
}
