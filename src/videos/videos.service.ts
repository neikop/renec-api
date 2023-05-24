import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @Inject('VIDEO_MODEL')
    private videoModel: Model<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = new this.videoModel(createVideoDto);
    return createdVideo.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }
}
