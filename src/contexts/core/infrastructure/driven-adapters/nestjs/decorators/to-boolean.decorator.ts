import { Transform } from 'class-transformer';
import { TypeParseUtils } from '../../../../domain/usecase/utils/type-parse.utils';

export function ToBoolean(): (target: NonNullable<unknown>, key: string) => void {
    const toPlain = Transform(
        ({ value }) => {
            return value;
        },
        {
            toPlainOnly: true,
        },
    );
    const toClass = (target: NonNullable<unknown>, key: string) => {
        return Transform(
            ({ obj }) => {
                return TypeParseUtils.valueToBoolean(obj[key]);
            },
            {
                toClassOnly: true,
            },
        )(target, key);
    };
    return function (target: NonNullable<unknown>, key: string) {
        toPlain(target, key);
        toClass(target, key);
    };
}
