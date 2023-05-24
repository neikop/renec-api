import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './schemas/video.schema';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
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
