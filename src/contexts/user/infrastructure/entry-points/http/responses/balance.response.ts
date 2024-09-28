import { ApiProperty } from '@nestjs/swagger';
import { HttpDefaultResponse } from '../../../../../shared/infrastructure/entry-points/http/responses/http-default.response';

export class BalanceResponse extends HttpDefaultResponse {
    @ApiProperty({ description: '' })
    galleons: number = 0;

    @ApiProperty({ description: '' })
    sickles: number = 0;

    @ApiProperty({ description: '' })
    knuts: number = 0;
}
