import { SharedErrorMessagesConstants } from './shared-error-messages.constants';

/**
 * Constants representing error codes related to posts finisher operations.
 * Codes must be between 1900 and 1999.
 */
export const ErrorCodesConstants: Record<SharedErrorMessagesConstants, number> = {
    [SharedErrorMessagesConstants.PAGINATION_PARAM_NOT_VALID]: 1000,
    [SharedErrorMessagesConstants.PAGINATION_PARAM_MUST_BE_GREATER_THAN_ZERO]: 1001,
};

const data: Map<number, string> = new Map();
const replied: Map<number, string[]> = new Map();
let success = true;
for (const error of Object.entries(ErrorCodesConstants)) {
    if (replied.has(error[1])) {
        replied.get(error[1]).push(error[0]);
    } else if (data.has(error[1])) {
        success = false;
        replied.set(error[1], [error[0], data.get(error[1])]);
    } else {
        data.set(error[1], error[0]);
    }
}
if (!success) {
    throw new Error(`Error codes replied:\n${JSON.stringify(Object.fromEntries(replied.entries()))}`);
}
