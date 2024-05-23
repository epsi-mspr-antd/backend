import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('PlantSpecies (e2e)', () => {
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
        .get('/plant-species')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/plant-species')
        .send()
        .expect(401)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
