import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('PlantGuarded (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const { app: nestApp, accessToken: token } = await setupApp();
    app = nestApp;
    accessToken = token;
  });

  describe('findAll', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .get('/plant-guarded')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/plant-guarded')
        .send()
        .expect(401)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('guard', () => {
    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/plant-guarded/guard/-1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(401)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('create', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/plant-guarded')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          from: new Date(),
          to: new Date(),
          plantId: 1,
        })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/plant-guarded')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          from: new Date(),
          to: new Date(),
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
        .patch('/plant-guarded/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          to: new Date(),
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/plant-guarded/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          to: new Date(),
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
        .delete('/plants/test')
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
