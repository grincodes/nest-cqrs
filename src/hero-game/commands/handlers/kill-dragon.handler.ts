import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Hero } from 'src/hero-game/hero.model';
import { HeroRepository } from '../../hero.repository';
import { KillDragonCommand } from '../Impl/kill-dragon.command';
import * as clc from 'cli-color';
@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private repository: HeroRepository,
    private publisher: EventPublisher,
  ) {}
  async execute(command: KillDragonCommand): Promise<any> {
    console.log(clc.greenBright('KillDragonCommand...'));
    const { heroId, dragonId } = command;
    // const res = this.repository.findOneById(heroId);
    const hero = this.publisher.mergeObjectContext(new Hero(heroId));
    //use class mergecontext
    // const HeroModel = this.publisher.mergeClassContext(Hero);
    // const hero = new HeroModel(heroId);

    // this applies the event
    hero.killEnemy(dragonId);
    hero.commit();
  }
}
