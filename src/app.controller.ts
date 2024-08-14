import { Controller, Get, Logger, Res } from '@nestjs/common';
import { Console } from 'console';
import { AppService } from './app.service';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(@Res() response: Response): void { }
}
