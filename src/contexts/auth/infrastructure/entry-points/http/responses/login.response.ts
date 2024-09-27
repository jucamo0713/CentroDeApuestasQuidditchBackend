import { HttpDefaultResponse } from '../../../../../shared/infrastructure/entry-points/http/responses/http-default.response';
import { ApiProperty } from '@nestjs/swagger';

/**
 * `LoginResponse` to provide a standard HTTP response structure for login-related operations.
 */
export class LoginResponse extends HttpDefaultResponse {
    @ApiProperty({ description: 'The access token used for authenticating API requests.' })
    accessToken: string = '';

    @ApiProperty({ description: 'The refresh token used to obtain a new access token when the current one expires.' })
    refreshToken: string = '';
}
