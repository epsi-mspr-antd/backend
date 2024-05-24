import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('tips (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const { app: nestApp, accessToken: token } = await setupApp();
    app = nestApp;
    accessToken = token;
  });

  describe('findPlantTips', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .get('/tips/plant/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/tips/plant/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('create', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/tips')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            description: 'Un nouveau tip pour votre plante',
            plantId: 1
        })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/tips')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            description: 'Un nouveau tip pour votre plante',
            plantId: null
        })
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });

    it('should error', () => {
        return request(app.getHttpServer())
          .post('/tips')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
              description: '',
              plantId: 1
          })
          .expect(400)
          .expect((response) => {
            expect(response.body).toHaveProperty('error');
          });
      });

    it('should error', () => {
        return request(app.getHttpServer())
          .post('/tips')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
              description: '',
              plantId: null
          })
          .expect(400)
          .expect((response) => {
            expect(response.body).toHaveProperty('error');
          });
      });
  });

  describe('update', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .patch('/tips/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          description: 'Maj du tip',
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/tips/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          description: 'Maj du tip',
        })
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('delete', () => {
    it('should error', () => {
      return request(app.getHttpServer())
        .delete('/tips/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
