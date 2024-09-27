export class PaginationMetadata {
    page: number = 0;

    total: number = 0;

    totalPages: number = 0;
}

export class PaginationType<T> {
    data: Array<T> = [];

    metadata: PaginationMetadata = new PaginationMetadata();
}
