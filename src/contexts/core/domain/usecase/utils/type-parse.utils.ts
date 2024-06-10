/**
 * Abstract class with functions to convert types.
 */
export abstract class TypeParseUtils {
    /**
     * Function to convert a value to a boolean.
     * @param value - The value to convert.
     * @returns The boolean representation of the value, or undefined if the conversion is not possible.
     * @example
     * const result: boolean = valueToBoolean('true'); // true
     */
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
