import { Controller, Post } from '@nestjs/common';
import { HeroGameService } from './hero-game.service';

@Controller('hero')
export class HeroGameController {
  // using command in controller
  //   constructor(private readonly commandBus: CommandBus) {}

  constructor(private readonly heroGameService: HeroGameService) {}

  @Post('/kill-dragon')
  async postKillDragon() {
    return await this.heroGameService.killDragon('superman', {
      dragonId: 'tarax',
    });
  }
}
