import { InFilterElement } from './in-filter.type';

/**
 * Type representing the search filters of the methods.
 */
export type SearchFilterType<T> = {
    [K in keyof T]?: T[K] | InFilterElement<T[K]>;
};
