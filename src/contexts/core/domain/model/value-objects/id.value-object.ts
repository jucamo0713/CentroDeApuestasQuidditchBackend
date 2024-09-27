import { StringValueObject } from './string.value-object';
import { v4 as uuid } from 'uuid';

export abstract class IdValueObject extends StringValueObject {
    static generate(): string {
        return uuid();
    }
}
