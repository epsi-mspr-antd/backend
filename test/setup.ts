import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

export async function setupApp(): Promise<{
  app: INestApplication;
  accessToken: string;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.init();

  const response = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({ email: 'test@test.fr', password: 'Test123/' })
    .expect(200);

  const accessToken = response.body.data.access_token;

  return { app, accessToken };
}
