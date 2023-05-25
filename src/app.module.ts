import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'auth/auth.module';
import { VideosModule } from 'videos/videos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/renec'),
    BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
    AuthModule,
    VideosModule,
  ],
})
export class AppModule {}
