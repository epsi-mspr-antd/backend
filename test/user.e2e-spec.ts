import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('Users (e2e)', () => {
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
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/users')
        .send()
        .expect(401)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('findOne', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .get('/users/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('update', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .patch('/users/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: 'test@test.fr',
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .patch('/users/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            email: 'test@test.fr',
        })
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

//   describe('delete', () => {
//     it('should error', () => {
//       return request(app.getHttpServer())
//         .delete('/users/test')
//         .set('Authorization', `Bearer ${accessToken}`)
//         .expect(400)
//         .expect((response) => {
//           expect(response.body).toHaveProperty('error');
//         });
//     });
//   });

  afterAll(async () => {
    await app.close();
  });
});
