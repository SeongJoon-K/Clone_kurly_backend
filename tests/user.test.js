const request = require('supertest');

const { createApp } = require('../app');
const { kurlyDataSource } = require('../APIs/models/data-source');

describe('Sign Up', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await kurlyDataSource.initialize();
  });

  afterAll(async () => {
    await kurlyDataSource.query(`TRUNCATE users`);
    await kurlyDataSource.destroy();
  });

  test('FAILED: invalid email', async () => {
    await request(app)
      .post('/signup')
      .send({ loginId: 'wrongEmail', password: 'passwor@', name: 'test' }) // body를 작성합니다.
      .expect(400)
      .expect({ message: 'PASSWORD IS NOT VALID' });
  });

  test('SUCCESS: created user', async () => {
    await request(app)
      .post('/signup')
      .send({
        loginId: '테스트용 아이디',
        password: 'tjdwnstjdwns2@',
        name: 'test2',
      })
      .expect(201)
      .expect({ message: 'Created Successful' });
  });

  test('FAILED: duplicated email', async () => {
    await request(app)
      .post('/signup')
      .send({ loginId: '테스트용 아이디', password: 'rlatjdwns2@' })
      .expect(409)
      .expect({
        message:
          "ER_DUP_ENTRY: Duplicate entry 'test3' for key 'users.user_ukey_user_id'",
      });
  });
});
