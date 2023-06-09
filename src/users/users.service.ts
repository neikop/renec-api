import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: SignUpDto): Promise<User> {
    const existed = await this.userModel.exists({
      username: createUserDto.username,
    });
    if (existed) {
      throw new BadRequestException('Username has been taken');
    }

    const salt = await bcrypt.genSalt();
    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, salt),
    });
    return createdUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}
