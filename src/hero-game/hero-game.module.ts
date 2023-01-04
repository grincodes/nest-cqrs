import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { HeroGameController } from './hero-game.controller';
import { HeroGameService } from './hero-game.service';
import { HeroRepository } from './hero.repository';

@Module({
  imports: [CqrsModule],
  controllers: [HeroGameController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    HeroRepository,
    HeroGameService,
  ],
})
export class HeroModule {}
