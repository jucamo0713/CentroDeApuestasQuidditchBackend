export abstract class TypeParseUtils {
    public static valueToBoolean(value: unknown): boolean | undefined {
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string') {
            if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
                return true;
            }
            if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
                return false;
            }
        }
        return undefined;
    }
}
