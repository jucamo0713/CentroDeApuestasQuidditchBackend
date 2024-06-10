import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CqrsCaller } from '../../../../domain/model/gateways/cqrs-caller';
import { CommandBase } from '../../../../domain/model/cqrs/CommandBase';
import { QueryBase } from '../../../../domain/model/cqrs/QueryBase';
import { EventBase } from '../../../../domain/model/cqrs/EventBase';
import { AppLogger } from '../logger/app.logger';

/**
 * Implementation of CqrsCaller using NestJS CQRS.
 */
@Injectable()
export class NestCqrsCaller implements CqrsCaller {
    private logger: AppLogger = new AppLogger(NestCqrsCaller.name);

    /**
     * Creates an instance of NestCqrsCaller.
     * @param dispatcher - The command bus for dispatching commands.
     * @param consultant - The query bus for executing queries.
     * @param emitter - The event bus for emitting events.
     */
    constructor(
        public readonly dispatcher: CommandBus,
        public readonly consultant: QueryBus,
        public readonly emitter: EventBus,
    ) {}

    /**
     * Dispatches a command using the command bus.
     * @async
     * @param command - The command to be dispatched.
     * @param [showCommand] - Flag to indicate whether to log the command.
     * @param [showResult] - Flag to indicate whether to log the result.
     * @returns - A promise resolving to the result of the command execution.
     */
    public async dispatch<C extends CommandBase, R = unknown>(
        command: C,
        showCommand: boolean = true,
        showResult: boolean = true,
    ): Promise<R> {
        let log = `[${this.dispatch.name}] - INIT- Dispatching command ${command.constructor.name}`;
        if (showCommand) log += ` :: ${JSON.stringify(command)}`;
        this.logger.log(log, command.PID);
        const data = await this.dispatcher.execute<C, R>(command);
        log = `[${this.dispatch.name}] - FINISH- Dispatched command ${command.constructor.name}`;
        if (showResult) log += ` :: Result ${JSON.stringify(data)}`;
        this.logger.log(log, command.PID);
        return data;
    }

    /**
     * Executes a query using the query bus.
     * @async
     * @param query - The query to be executed.
     * @param [showQuery] - Flag to indicate whether to log the query.
     * @param [showResult] - Flag to indicate whether to log the result.
     * @param [showLogs] -  Flag to indicate when to display logs.
     * @returns - A promise resolving to the result of the query execution.
     */
    public async query<Q extends QueryBase, R = unknown>(
        query: Q,
        showQuery: boolean = true,
        showResult: boolean = true,
        showLogs: boolean = true,
    ): Promise<R> {
        let log = `[${this.query.name}] - INIT- Executing query ${query.constructor.name}`;
        if (showQuery) log += ` :: ${JSON.stringify(query)}`;
        if (showLogs) this.logger.log(log, query.PID);
        const data = await this.consultant.execute<Q, R>(query);
        log = `[${this.query.name}] - FINISH- Executed query ${query.constructor.name}`;
        if (showResult) log += ` :: Result ${JSON.stringify(data)}`;
        if (showLogs) this.logger.log(log, query.PID);
        return data;
    }

    /**
     * Emits an event using the event bus.
     * @async
     * @param event - The event to be emitted.
     * @param [showEvent] - Flag to indicate whether to log the event.
     * @returns - A promise resolving when the event is emitted.
     */
    public async emit<E extends EventBase>(event: E, showEvent: boolean = true): Promise<void> {
        let log = `[${this.emit.name}] - INIT- Emitting event ${event.constructor.name}`;
        if (showEvent) log += ` :: ${JSON.stringify(event)}`;
        this.logger.log(log, event.PID);
        this.emitter.publish<E>(event);
        this.logger.log(`[${this.emit.name}] - FINISH- Emitted event ${event.constructor.name}`, event.PID);
    }
}
