import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('Addresses (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const { app: nestApp, accessToken: token } = await setupApp();
    app = nestApp;
    accessToken = token;
  });

  describe('create', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/addresses')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            street: 'Je suis une nouvelle rue',
            zip: '37000',
            city: 'TOURS',
            longitude: 0.8357,
            latitude: 30.764
        })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/addresses')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          street: 'Je suis une nouvelle rue',
          zip: '37000',
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
        .patch('/addresses/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          street: 'Je suis une nouvelle rue',
          zip: '37000',
          city: 'TOURS',
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/addresses/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          street: 'Je suis une nouvelle rue',
          zip: '37000'
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
        .delete('/addresses/test')
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
