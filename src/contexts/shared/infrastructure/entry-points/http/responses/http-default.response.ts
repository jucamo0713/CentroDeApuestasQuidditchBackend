import { ApiProperty } from '@nestjs/swagger';

export class HttpDefaultResponse {
    @ApiProperty({
        type: Boolean,
    })
    public readonly success: true = true as const;
}
