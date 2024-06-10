import { Transform } from 'class-transformer';
import { TypeParseUtils } from '../../../../domain/usecase/utils/type-parse.utils';

/**
 * Decorator to transform a value to a boolean during serialization.
 * @returns Decorator function.
 */
export function ToBoolean(): (target: unknown, key: string) => void {
    const toPlain = Transform(
        ({ value }) => {
            return value;
        },
        {
            toPlainOnly: true,
        },
    );
    const toClass = (target: unknown, key: string) => {
        return Transform(
            ({ obj }) => {
                return TypeParseUtils.valueToBoolean(obj[key]);
            },
            {
                toClassOnly: true,
            },
        )(target, key);
    };
    return function (target: unknown, key: string) {
        toPlain(target, key);
        toClass(target, key);
    };
}
