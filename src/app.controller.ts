import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HeroGameService } from './hero-game/hero-game.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
