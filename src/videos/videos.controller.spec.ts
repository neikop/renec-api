import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import { CreateVideoDto } from './dto/create-video.dto';
import { FetchVideoDto } from './dto/fetch-video.dto';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

const videoService = {
  create: jest.fn(),
  fetchByPagination: jest.fn(),
};

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        { provide: VideosService, useValue: videoService },
        AuthGuard,
        JwtService,
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('VideoService', () => {
    it('should call `create` once', async () => {
      const video: CreateVideoDto = {
        url: 'https://youtube.com/watch?v=abc',
        title: 'video',
        authorName: 'author',
        authorUrl: 'https://youtube.com/@channel',
        thumbnailUrl: 'https://example.com/abc.png',
        html: '',
      };
      const req = {
        user: {},
      };
      await controller.create(video, req);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should call `fetchByPagination` once', async () => {
      const query: FetchVideoDto = {
        page: 1,
        size: 10,
      };
      await controller.fetch(query);
      expect(service.fetchByPagination).toHaveBeenCalledTimes(1);
    });
  });
});
