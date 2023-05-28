import { getQueueToken } from '@nestjs/bull';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayload } from 'auth/dto/jwt-payload.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './schemas/video.schema';
import { VideosService } from './videos.service';

const videoModel = {
  find: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
};

const videoQueue = {
  add: jest.fn(),
};

describe('VideosService', () => {
  let service: VideosService;
  let model: typeof videoModel;
  let queue: typeof videoQueue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        { provide: getModelToken(Video.name), useValue: videoModel },
        { provide: getQueueToken(Video.name), useValue: videoQueue },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    model = module.get(getModelToken(Video.name));
    queue = module.get(getQueueToken(Video.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
    expect(queue).toBeDefined();
  });

  it('should create new one', async () => {
    const video: CreateVideoDto = {
      url: 'https://youtube.com/watch?v=abc',
      title: 'video',
      authorName: 'author',
      authorUrl: 'https://youtube.com/@channel',
      thumbnailUrl: 'https://example.com/abc.png',
    };
    const user: JwtPayload = {
      sub: '0x123',
      username: 'john',
    };
    model.create.mockResolvedValueOnce({ toJSON: jest.fn() });

    await service.create(video, user);
    expect(model.create).toHaveBeenCalledTimes(1);
    expect(queue.add).toHaveBeenCalledTimes(1);
  });

  it('should throw not found', async () => {
    model.find.mockResolvedValueOnce({});
    try {
      const query = {
        page: 1,
        size: 10,
      };
      await service.fetchByPagination(query);
    } catch (e) {
      expect(model.find).toBeCalledTimes(1);
      expect(model.find).toHaveBeenLastCalledWith();
    }
  });
});
