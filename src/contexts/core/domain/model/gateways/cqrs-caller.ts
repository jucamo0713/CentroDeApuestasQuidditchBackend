import { CommandBase } from '../cqrs/CommandBase';
import { QueryBase } from '../cqrs/QueryBase';
import { EventBase } from '../cqrs/EventBase';

/**
 * Interface representing a CQRS (Command Query Responsibility Segregation) caller,
 * providing methods for dispatching commands, querying, and emitting events.
 */
export interface CqrsCaller {
    /**
     * Dispatches a command using the CQRS pattern.
     * @param {CommandBase} command - The command to be dispatched.
     * @param {boolean} showCommand - Flag to indicate whether to log the command (optional).
     * @param {boolean} showResult - Flag to indicate whether to log the result (optional).
     * @returns {Promise<unknown>} A promise that resolves with the result of the command execution.
     */
    dispatch<C extends CommandBase, R = unknown>(command: C, showCommand?: boolean, showResult?: boolean): Promise<R>;

    /**
     * Emits an event using the CQRS pattern.
     * @param {EventBase} event - The event to be emitted.
     * @param {boolean} showEvent - Flag to indicate whether to log the event (optional).
     * @returns {Promise<void>} A promise that resolves when the event is successfully emitted.
     */
    emit<E extends EventBase>(event: E, showEvent?: boolean): Promise<void>;

    /**
     * Executes a query using the CQRS pattern.
     * @param {QueryBase} query - The query to be executed.
     * @param {boolean} showQuery - Flag to indicate whether to log the query (optional).
     * @param {boolean} showResult - Flag to indicate whether to log the result (optional).
     * @param {boolean} showLogs - Flag to indicate when to display logs (optional).
     * @returns {Promise<unknown>} A promise that resolves with the result of the query execution.
     */
    query<Q extends QueryBase, R = unknown>(
        query: Q,
        showQuery?: boolean,
        showResult?: boolean,
        showLogs?: boolean,
    ): Promise<R>;
}
