import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './schemas/video.schema';

@Injectable()
export class VideosService {
  constructor(
    @InjectQueue('video') private videoQueue: Queue,
    @InjectModel(Video.name)
    private videoModel: Model<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = await new this.videoModel(createVideoDto).save();
    this.videoQueue.add('create', { ...createdVideo.toJSON() });
    return createdVideo;
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }
}
