import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { FetchVideoDto } from './dto/fetch-video.dto';
import { Video } from './schemas/video.schema';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectQueue(Video.name) private videoQueue: Queue,
  ) {}

  async create(createVideoDto: CreateVideoDto, user: JwtPayload) {
    const createdVideo = await this.videoModel.create({
      ...createVideoDto,
      createdAt: Date.now(),
      createdBy: user.sub,
    });
    this.videoQueue.add('create', { ...createdVideo.toJSON() });
    return createdVideo;
  }

  async fetchByPagination(query: FetchVideoDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.size) || 10;
    const skip = (page - 1) * limit;
    const result = this.videoModel
      .find()
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .exec();
    const counter = this.videoModel.countDocuments().exec();
    return Promise.all([result, counter]).then(([items, total]) => ({
      items: items.map((item) => item.toJSON()),
      total,
      page,
      size: limit,
    }));
  }
}
