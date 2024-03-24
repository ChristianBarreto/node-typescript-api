import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HourFixture from '@test/fixtures/stormglass_weather_3_hour.json';
import stormGlassNormalizedWeather3HourFixture from '@test/fixtures/stormglass_normalized_weather_3_hour.json';

jest.mock('axios');

describe('stormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it('should return the normalized forecast from the stormGlass service', async () => {
    const lat = 33.123123;
    const lng = 131.123123;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HourFixture });

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual(stormGlassNormalizedWeather3HourFixture);
  });
});
