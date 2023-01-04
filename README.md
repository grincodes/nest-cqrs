Resources
[https://barryvanveen.nl/articles/49-what-is-a-command-bus-and-why-should-you-use-it]
[https://barryvanveen.nl/articles/59-different-kinds-of-service-bus-command-bus-service-bus-and-query-bus]
[https://matthiasnoback.nl/2015/01/responsibilities-of-the-command-bus/]
[https://www.learmoreseekmore.com/2021/10/nestjs-application-using-cqrs-design-pattern.html]

# Command Bus
Command Bus can be called in controller or service
The CommandBus is a stream of commands. It delegates commands to the equivalent handlers. Each command must have a corresponding Command Handler:

------------------------------------------
the @CommandHandler is used to mark a class as a nest command handler 
it takes the class of the comannd
@CommandHandler(CommandClass)
hanler class should implements ICommandHandler

Steps:
create a command handler 
to execute command on using the command bus in controller or service

# Events
Command handlers neatly encapsulate logic. While beneficial, the application structure is still not flexible enough, not reactive. To remedy this, we also introduce events.

Events are asynchronous. They are dispatched either by models or directly using EventBus. In order to dispatch events, models have to extend the AggregateRoot class.


Commands are handled by command handlers. A command must be handled by exactly one handler. In this sense, it differs from events, where we don't care how many handlers (listeners) are involved.

The command bus
The command bus matches commands to handlers. This matching can be done automatically by some kind of naming convention. Another option is to register the relationships on the command bus.

When a command is dispatched, the bus locates the handler and calls the handle method.

The interface of the command bus might look like this:

interface CommandBusInterface
{
    public function subscribe(string $commandClassName, string $handlerClassName);

    public function dispatch(CommandInterface $command);
}
There are many command bus implementations available. There are Tactician and SimpleBus, for example. Laravel ships with a queue that is basically a command bus on steroids.

Dispatching a command
Let's look at an example of how a command can be dispatched:

``` final class RegistrationController
{
    public function __construct(CommandBusInterface $bus)
    {
        $this->bus = $bus;
    }

    public function register(Request $request)
    {
        $command = new RegisterUser($request->username, $request->password);

        $this->bus->subscribe(RegisterUser::class, RegisterUserHandler::class);

        $this->bus->dispatch($command);
    }```
Again, this example is simplified. The request needs to be validated before usage. Also, subscribing commands and handlers is something you don't want to do in the controller. If you are working in Laravel, this could be done in a ServiceProvider.


# Note
In the setup don't forget to include   imports: [CqrsModule]

Events are asynchronous. They are dispatched either by models or directly using EventBus. In order to dispatch events, models have to extend the AggregateRoot class.

1.

2.

Steps:
Create one or multiple event handlers
dispatch event with 2 methods .

1. using models ...
   - first we need to push the event to the event bus queue this is done
   by using the Aggregate root apply ; in this case the event is not yet 
   published to all handlers ... 
   - to publish the event outside the model after applying the event to store
   we use  eventPublisher ; we would pass an AggregateRoot to the  method mergeObjectContext()
        - we could use the class mergeClassContext() of the eventPublisher as well
            `const HeroModel = this.publisher.mergeClassContext(Hero);`
   - then we immediately commit() the eventPublisher

2. dispatch the event with the EventBus
  `this.eventBus.publish(new HeroKilledDragonEvent());`
