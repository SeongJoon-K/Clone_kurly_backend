const request = require('supertest');

const { createApp } = require('../app');
const { kurlyDataSource } = require('../APIs/models/data-source');

describe('Sign Up', () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await kurlyDataSource.initialize();
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await kurlyDataSource.query(`TRUNCATE users`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await kurlyDataSource.destroy();
  });

  test('FAILED: invalid email', async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post('/signup') // HTTP Method, 엔드포인트 주소를 작성합니다.
      .send({ email: 'wrongEmail', password: 'password001@' }) // body를 작성합니다.
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: 'invalid email!' });
  });

  // 다음과 같이 본인이 작성한 코드에 맞춰 다양한 케이스를 모두 테스트해야 합니다.
  // 그래야 의도에 맞게 코드가 잘 작성되었는지 테스트 단계에서부터 확인할 수 있습니다!
  test('SUCCESS: created user', async () => {
    await request(app)
      .post('/signup')
      .send({ email: 'wecode001@gmail.com', password: 'password001@' })
      .expect(201);
  });

  test('FAILED: duplicated email', async () => {
    await request(app)
      .post('/signup')
      .send({ login_id: 'wecode001@gmail.com', password: 'password001@' })
      .expect(500)
      .expect({ message: 'KEY_ERROR' });
  });
});
