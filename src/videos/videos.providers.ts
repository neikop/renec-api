import { Connection } from 'mongoose';
import { VideoSchema } from './schemas/video.schema';

export const videosProviders = [
  {
    provide: 'VIDEO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Video', VideoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
