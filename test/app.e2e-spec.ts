import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/auth/profile (GET)', () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  it('/videos (GET)', () => {
    return request(app.getHttpServer()).get('/videos').expect(401);
  });

  describe('Check Authentication', () => {
    let jwtToken: string;

    it('should login after registered', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: 'john', password: 'changeme' });

      const login = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'john', password: 'changeme' })
        .expect(201);

      jwtToken = login.body.accessToken;
    });

    it('can get profile with jwtToken', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .expect(({ body }) => {
          expect(body.username).toEqual('john');
        });
    });

    it('can fetch videos with jwtToken', () => {
      return request(app.getHttpServer())
        .get('/videos')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .expect(({ body }) => {
          expect(body.items.length).toBeGreaterThanOrEqual(0);
          expect(body.total).toBeGreaterThanOrEqual(0);
        });
    });
  });
});
