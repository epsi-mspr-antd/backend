import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('Plants (e2e)', () => {
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
        .get('/plants')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/plants')
        .send()
        .expect(401)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('findUserPlants', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .get('/plants/user/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/plants/user/test')
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
        .post('/plants')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Je suis une plante',
          speciesId: 1,
          statusId: 1,
          addressId: 1,
        })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/plants')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Je suis une plante',
          speciesId: 1,
          statusId: 1,
        })
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('fetchAllGuard', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .get('/plants/guard/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });
  });

  describe('guard', () => {
    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/plants/guard/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('unguard', () => {
    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/plants/unguard/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('update', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .patch('/plants/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Je suis une plante',
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/plants/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Je suis une plante',
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
