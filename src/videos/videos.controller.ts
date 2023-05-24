import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'auth/auth.guard';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './schemas/video.schema';
import { VideosService } from './videos.service';

@ApiBearerAuth()
@ApiTags('Video')
@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }
}
