import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './setup';

describe('auth (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const { app: nestApp, accessToken: token } = await setupApp();
    app = nestApp;
    accessToken = token;

    const requestToken = await request(app.getHttpServer())
                            .post('/auth/signin')
                            .send({
                                email: 'test@test.fr',
                                password: 'Test123/'
                            })

    refreshToken = requestToken.body.data.refresh_token;
  });

  describe('signup', () => {
    it('should error', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            email: 'jeneSuisPasUnEmail',
            password: 'jeSuisUnPassword'
        })
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toEqual(['email must be an email']);
        });
    });    

    it('should error', () => {
        return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            email: '',
            password: 'jeSuisUnPassword'
        })
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toEqual(['email must be an email']);
        });
    });

    it('should error', () => {
        return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            email: '',
            password: ''
        })
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toEqual(['email must be an email','password should not be empty']);
        });
    });

    it('should error', () => {
        return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            email: 'test.test@test.com',
            password: ''
        })
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toEqual(['password should not be empty']);
        });
    });
  });

  describe('signin', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
            email: 'test@test.fr',
            password: 'Test123/'
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({})
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toEqual(['email must be an email', 'password must be a string', 'password should not be empty']);
          expect(response.body.error).toEqual('Bad Request');
        });
    });

    it('should error', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: 'test@test.fr',
            password: ''
        })
          .expect(400)
          .expect((response) => {
            expect(response.body.message).toEqual(['password should not be empty']);
            expect(response.body.error).toEqual('Bad Request');
          });
      });

      it('should error', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: '',
            password: 'Test123/'
        })
          .expect(400)
          .expect((response) => {
            expect(response.body.message).toEqual(['email must be an email']);
            expect(response.body.error).toEqual('Bad Request');
          });
      });

    it('should error', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .expect(400)
          .expect((response) => {
            expect(response.body).toHaveProperty('error');
          });
      });
  });

  describe('refreshTokens', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send()
        .set('authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .set('authorization', `Bearer ${accessToken}`)
        .expect(401)
        .expect((response) => {
          expect(response.body).toHaveProperty('error');
        });
    });
  });

  describe('logout', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('authorization', `Bearer ${accessToken}`)
        .expect(200)
    });

    it('should error', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('authorization', `valueDefault`)
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
