import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroKilledDragonEvent } from '../Impl/hero-killed-dragon.event';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
  implements IEventHandler<HeroKilledDragonEvent>
{
  handle(event: HeroKilledDragonEvent) {
    console.log(clc.greenBright(`HeroKilledDragonEvent By... ${event.heroId}`));
  }
}
