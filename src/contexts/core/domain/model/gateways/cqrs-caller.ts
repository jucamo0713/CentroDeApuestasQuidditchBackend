import { ICommand, IEvent, IQuery } from '@nestjs/cqrs';

export interface CqrsCaller {
    dispatch<C extends ICommand, R = unknown>(command: C, showCommand?: boolean, showResult?: boolean): Promise<R>;

    emit<E extends IEvent>(event: E, showEvent?: boolean): Promise<void>;

    query<Q extends IQuery, R = unknown>(
        query: Q,
        showQuery?: boolean,
        showResult?: boolean,
        showLogs?: boolean,
    ): Promise<R>;
}
