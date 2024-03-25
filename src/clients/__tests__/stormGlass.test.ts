import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HourFixture from '@test/fixtures/stormglass_weather_3_hour.json';
import stormGlassNormalizedWeather3HourFixture from '@test/fixtures/stormglass_normalized_weather_3_hour.json';

jest.mock('axios');

describe('stormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it('Should return the normalized forecast from the stormGlass service', async () => {
    const lat = 33.123123;
    const lng = 131.123123;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HourFixture });

    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual(stormGlassNormalizedWeather3HourFixture);
  });

  it('Should exclude incomplete data points', async () => {
    const lat = 33.123123;
    const lng = 131.123123;
    const incompleteResponse = {
      hours: [{
        windDirection: {
          noaa: 300
        },
        time: '2024-04-26T00:00:00+00:00'
      }]
    };
    mockedAxios.get.mockResolvedValue({ data: incompleteResponse });

    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual([]);
  });

  it('Should get a generic error from StormGlass service when the request fails before reach service', async () => {
    const lat = 33.123123;
    const lng = 131.123123;
    
    mockedAxios.get.mockRejectedValue({ message: 'Network error'});

    const stormGlass = new StormGlass(mockedAxios);
    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network error'
    )
  })

  it('Should get an StormGlassResponseError when the StormGlass service responds with error', async () => {
    const lat = 33.123123;
    const lng = 131.123123;
    
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 429,
        data: { errors: ['Rate Limit reached'] },
      }
    })

    const stormGlass = new StormGlass(mockedAxios);

    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429'
    )
  })
});
