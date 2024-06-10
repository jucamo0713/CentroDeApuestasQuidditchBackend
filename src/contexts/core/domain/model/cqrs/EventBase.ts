import { IEvent } from '@nestjs/cqrs';

/**
 * Base class for events in a CQRS (Command Query Responsibility Segregation) architecture.
 * Events represent something that has happened in the system and may trigger further actions.
 */
export class EventBase implements IEvent {
    /**
     * Creates an instance of `EventBase`.
     * @param PID - Process Identifier for tracking the event.
     */
    constructor(public readonly PID: string) {}
}
