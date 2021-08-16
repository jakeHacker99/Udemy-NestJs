import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('hadnles a signup request', () => {
    const email = "tja22@hotmail.com";
    return request(app.getHttpServer())

      .post("auth/singup")
      .send({
        email,
        password: "121212"
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body
        expect(id).toBeDefined()

        expect(email).toBeDefined()
      })
  });
});
