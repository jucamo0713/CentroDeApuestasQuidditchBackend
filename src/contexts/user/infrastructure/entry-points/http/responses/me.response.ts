import { ApiProperty } from '@nestjs/swagger';
import { HttpDefaultResponse } from '../../../../../shared/infrastructure/entry-points/http/responses/http-default.response';

export class MeResponse extends HttpDefaultResponse {
    @ApiProperty({ description: '' })
    fullName: string = '';

    @ApiProperty({ description: '' })
    username: string = '';

    @ApiProperty({ description: '' })
    email: string = '';
}
