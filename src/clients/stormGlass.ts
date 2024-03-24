import { AxiosStatic } from 'axios';

export interface StormGlassPointSource {
  [key: string]: number; //[key: string] defines a dynamic key that fits for all data
}

export interface StormGlassPoint {
  readonly time: string;
  readonly waveHeight: StormGlassPointSource;
  readonly waveDirection: StormGlassPointSource;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[]; //set as an array of StormGlassPoint
}

export interface ForecastPoint {
  time: string;
  waveHeight: number;
  waveDirection: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  windDirection: number;
  windSpeed: number;
}

export class StormGlass {
  readonly stormGlassApiParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassApiSource = 'noaa';
  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    const response = await this.request.get<StormGlassForecastResponse>( // the get method expects the type of the get response
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassApiParams}&source=${this.stormGlassApiSource}&end=1592113802&lat=${lat}&lng=${lng}`,
      {
        headers: {
          Authorization: 'token',
        },
      }
    );

    return this.normalizeResponse(response.data);
  }

  private normalizeResponse(
    points: StormGlassForecastResponse
  ): ForecastPoint[] {
    return points.hours
      .filter(this.isValidPoint.bind(this)) // bind should be used because this private method is being used by an external function "filter()"
      .map((point) => ({
        swellDirection: point.swellDirection[this.stormGlassApiSource],
        swellHeight: point.swellHeight[this.stormGlassApiSource],
        swellPeriod: point.swellPeriod[this.stormGlassApiSource],
        time: point.time,
        waveDirection: point.waveDirection[this.stormGlassApiSource],
        waveHeight: point.waveHeight[this.stormGlassApiSource],
        windDirection: point.windDirection[this.stormGlassApiSource],
        windSpeed: point.windSpeed[this.stormGlassApiSource],
      }));
  }

  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    // the Partial makes the interface be able to accepts null, and force we check all the keys
    return !!(
      // return a boolean to be used as filter
      (
        point.time &&
        point.swellDirection?.[this.stormGlassApiSource] && // if we have swellDirection, check if the key stormGlassApiSource ("noaa")
        point.swellHeight?.[this.stormGlassApiSource] &&
        point.swellPeriod?.[this.stormGlassApiSource] &&
        point.waveDirection?.[this.stormGlassApiSource] &&
        point.waveHeight?.[this.stormGlassApiSource] &&
        point.windDirection?.[this.stormGlassApiSource] &&
        point.windSpeed?.[this.stormGlassApiSource]
      )
    );
  }
}
