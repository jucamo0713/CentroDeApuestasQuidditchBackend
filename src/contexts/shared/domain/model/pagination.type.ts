/**
 * Class representing the metadata of a pagination.
 */
export class MetadataType {
    /**
     * The page on which the paginated method is found.
     * @default 0
     */
    page: number = 0;
    /**
     * The total number of elements that can be paginated.
     * @default 0
     */
    total: number = 0;
    /**
     * The total number of pages that can be paginated.
     * @default 0
     */
    totalPages: number = 0;
}

/**
 * Class representing a paged response.
 * @template T
 */
export class PaginationType<T> {
    /**
     * The elements that are paginated.
     * @default []
     */
    data: Array<T> = [];
    /**
     * Metadata of the elements being paginated
     * @default new MetadataType()
     */
    metadata: MetadataType = new MetadataType();
}
