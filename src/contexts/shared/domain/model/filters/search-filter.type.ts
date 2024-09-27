import { InFilterElement } from './in-filter.type';

export type SearchFilterType<T> = {
    [K in keyof T]?: T[K] | InFilterElement<T[K]>;
};
