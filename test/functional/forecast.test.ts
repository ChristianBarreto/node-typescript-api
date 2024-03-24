describe('Beach forecast functional test', () => {
  it('it should return a forecast with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/forecast');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        time: 'foo',
        forecast: [
          {
            foo: 'bar',
          },
        ],
      },
      {
        time: 'foo',
        forecast: [
          {
            foo: 'bar',
          },
        ],
      },
    ]);
  });
});
