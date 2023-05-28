import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

const mappingModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  exists: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof mappingModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mappingModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should throw existed', async () => {
    model.exists.mockResolvedValueOnce(true);
    try {
      await service.create({ username: 'john', password: 'doe' });
    } catch (e) {
      expect(e.message).toBe('Username has been taken');
      expect(model.exists).toHaveBeenCalledTimes(1);
    }
  });

  it('should create new one', async () => {
    model.exists.mockResolvedValueOnce(false);
    await service.create({ username: 'john', password: 'doe' });
    expect(model.create).toHaveBeenCalledTimes(1);
  });

  it('should throw not found', async () => {
    model.find.mockRejectedValueOnce({ message: 'not found :)' });
    try {
      await service.findOne('john');
    } catch (e) {
      expect(e.message).toBe('Record not found.');
      expect(model.findOne).toHaveBeenCalledTimes(1);
    }
  });

  it('should find real one', async () => {
    model.findOne.mockReset();
    await service.findOne('john');
    expect(model.findOne).toHaveBeenCalledTimes(1);
  });
});
