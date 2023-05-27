import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'auth/auth.module';
import { env } from 'env';
import { VideosModule } from 'videos/videos.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${env.mongodbService}/renec`),
    BullModule.forRoot({ redis: { host: env.regisService, port: 6379 } }),
    AuthModule,
    VideosModule,
  ],
})
export class AppModule {}
