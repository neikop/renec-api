import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'auth/auth.module';
import { VideosModule } from 'videos/videos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/renec'),
    AuthModule,
    VideosModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('videos');
  }
}
