import { ICommand } from '@nestjs/cqrs';

/**
 * Base class for commands in a CQRS (Command Query Responsibility Segregation) architecture.
 * Commands represent an intention to perform some action.
 */
export class CommandBase implements ICommand {
    /**
     * Creates an instance of `CommandBase`.
     * @param PID - Process Identifier for tracking the command.
     */
    constructor(public readonly PID: string) {}
}
