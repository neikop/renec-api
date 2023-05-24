import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { VideosModule } from 'videos/videos.module';

@Module({
  imports: [AuthModule, VideosModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('videos');
  }
}
