import { IdValueObject } from '../../../core/domain/model/value-objects/id.value-object';

export class UserId extends IdValueObject {
    static generate(): string {
        return IdValueObject.generate();
    }
}
