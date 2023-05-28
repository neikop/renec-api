import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateVideoDto } from './dto/create-video.dto';
import { FetchVideoDto } from './dto/fetch-video.dto';
import { VideosService } from './videos.service';

@ApiBearerAuth()
@ApiTags('Video')
@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createVideoDto: CreateVideoDto, @Request() req) {
    return this.videosService.create(createVideoDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async fetch(@Query() query: FetchVideoDto) {
    return this.videosService.fetchByPagination(query);
  }
}
