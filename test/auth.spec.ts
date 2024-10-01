import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import exp from 'constants';

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("POST /api/users/login", () => {
    it("sould be rejected if user not found", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/auth/login')
        .send({
          username: 'test123',
          password: 'test123'
        });

      expect(response.status).toBe(404)
      expect(response.body.errors).toBeDefined();
    })

    it("should be rejected if password invalid", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users/auth/login")
        .send({
          username: 'Zai14',
          password: 'HanyaTest'
        })

      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
    })

    it("should be success login", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users/auth/login")
        .send({
          username: "Zai14",
          password: "Qwe123@@"
        })

      expect(response.status).toBe(201)
      expect(response.body.data.token).toBeDefined()
    })
  })

  describe("POST /api/users/auth/register", () => {
    it("should be rejected unique username", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users/auth/register")
        .send({
          username: "Zai14",
          password: "Test",
          name: "test123"
        })


      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
    })
  })

});
