import { PaginationMetadata } from '../../../../domain/model/pagination';
import { ApiProperty } from '@nestjs/swagger';

export class HttpPaginationMetadataResponse implements PaginationMetadata {
    @ApiProperty({ description: 'The current page number.' })
    page: number = 0;

    @ApiProperty({ description: 'The total number of items across all pages.' })
    total: number = 0;

    @ApiProperty({ description: 'The total number of pages.' })
    totalPages: number = 0;
}
