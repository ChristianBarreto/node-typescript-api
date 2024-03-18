import supertest from "supertest";

describe('Beach forecast functional test', () => {
  it('it should return a forecast with just a few times', async () => {
    const { body, status } = await supertest(app).get('/forecast');
    expect(status).toBe(200);
    expect(body).toBe([
      {
        "time": "foo",
        "forecast": [
          {
            "foo": "bar"
          }
        ]
      },
      {
        "time": "foo",
        "forecast": [
          {
            "foo": "bar"
          }
        ]
      }
    ])
  })
})