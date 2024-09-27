export class MetadataType {
    page: number = 0;

    total: number = 0;

    totalPages: number = 0;
}

export class PaginationType<T> {
    data: Array<T> = [];

    metadata: MetadataType = new MetadataType();
}
