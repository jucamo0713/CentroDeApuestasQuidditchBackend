import { IQuery } from '@nestjs/cqrs';

/**
 * Base class for queries in a CQRS (Command Query Responsibility Segregation) architecture.
 * Queries represent a request for information and are used to retrieve data from the system.
 */
export class QueryBase implements IQuery {
    /**
     * Creates an instance of `QueryBase`.
     * @param PID - Process Identifier for tracking the query.
     */
    constructor(public readonly PID: string) {}
}
