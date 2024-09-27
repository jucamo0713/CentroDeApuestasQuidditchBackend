import { ApiProperty } from '@nestjs/swagger';
import { HttpDefaultResponse } from '../../../../../shared/infrastructure/entry-points/http/responses/http-default.response';

export class SignupResponse extends HttpDefaultResponse {
    @ApiProperty({ description: 'The access token used for authenticating API requests.' })
    accessToken: string = '';

    @ApiProperty({ description: 'The refresh token used to obtain a new access token when the current one expires.' })
    refreshToken: string = '';
}
