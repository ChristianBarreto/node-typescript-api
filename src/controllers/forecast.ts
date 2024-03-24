import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('forecast')
export class ForecastController {
  @Get('') // This defines the route "/"
  public getForecastForLoggedUser(_: Request, res: Response): void {
    // receive request and response like express
    res.send([
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
  }
}
