import { StringValueObject } from './string.value-object';
import { v4 as uuid } from 'uuid';

/**
 * Abstract base class for representing ID value objects, extending the StringValueObject class.
 */
export abstract class IdValueObject extends StringValueObject {
    /**
     * Generates an id with the uuid structure.
     * @returns The generated id.
     */
    static generate(): string {
        return uuid();
    }
}
