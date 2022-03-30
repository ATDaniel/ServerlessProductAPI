const { app } = require('../src/handler');

describe('app', () => {
  test('app to be defined', () => {
    expect(app).toBeDefined();
  });

  test('post route should exist', () => {
    expect(app.post).toBeDefined();
  });

  test('get route should exist', () => {
    expect(app.get).toBeDefined();
  });
});