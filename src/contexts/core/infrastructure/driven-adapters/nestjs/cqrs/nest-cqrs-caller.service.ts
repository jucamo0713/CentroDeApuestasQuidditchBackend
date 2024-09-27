import { CommandBus, EventBus, ICommand, IEvent, IQuery, QueryBus } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { CqrsCaller } from '../../../../domain/model/gateways/cqrs-caller';

@Injectable()
export class NestCqrsCaller implements CqrsCaller {
    private logger: Logger = new Logger(NestCqrsCaller.name);

    constructor(
        public readonly dispatcher: CommandBus,
        public readonly consultant: QueryBus,
        public readonly emitter: EventBus,
    ) {}

    public async dispatch<C extends ICommand, R = unknown>(
        command: C,
        showCommand: boolean = true,
        showResult: boolean = true,
    ): Promise<R> {
        let log = `[${this.dispatch.name}] - INIT- Dispatching command ${command.constructor.name}`;
        if (showCommand) log += ` :: ${JSON.stringify(command)}`;
        this.logger.log(log);
        const data = await this.dispatcher.execute<C, R>(command);
        log = `[${this.dispatch.name}] - FINISH- Dispatched command ${command.constructor.name}`;
        if (showResult) log += ` :: Result ${JSON.stringify(data)}`;
        this.logger.log(log);
        return data;
    }

    public async query<Q extends IQuery, R = unknown>(
        query: Q,
        showQuery: boolean = true,
        showResult: boolean = true,
        showLogs: boolean = true,
    ): Promise<R> {
        let log = `[${this.query.name}] - INIT- Executing query ${query.constructor.name}`;
        if (showQuery) log += ` :: ${JSON.stringify(query)}`;
        if (showLogs) this.logger.log(log);
        const data = await this.consultant.execute<Q, R>(query);
        log = `[${this.query.name}] - FINISH- Executed query ${query.constructor.name}`;
        if (showResult) log += ` :: Result ${JSON.stringify(data)}`;
        if (showLogs) this.logger.log(log);
        return data;
    }

    public async emit<E extends IEvent>(event: E, showEvent: boolean = true): Promise<void> {
        let log = `[${this.emit.name}] - INIT- Emitting event ${event.constructor.name}`;
        if (showEvent) log += ` :: ${JSON.stringify(event)}`;
        this.logger.log(log);
        this.emitter.publish<E>(event);
        this.logger.log(`[${this.emit.name}] - FINISH- Emitted event ${event.constructor.name}`);
    }
}
