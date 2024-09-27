import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidationExceptionConstants } from '../../../../../shared/domain/model/exceptions/validation-exception.constants';

export class LoginRequest {
    @ApiProperty({ description: "The user's email address." })
    @IsEmail({}, { message: ValidationExceptionConstants.EMAIL_NOT_VALID })
    @IsString({ message: ValidationExceptionConstants.EMAIL_MUST_BE_STRING })
    @IsNotEmpty({ message: ValidationExceptionConstants.EMAIL_IS_REQUIRED })
    email: string = '';

    @ApiProperty({ description: "The user's password." })
    @IsString({ message: ValidationExceptionConstants.PASSWORD_MUST_BE_STRING })
    @IsNotEmpty({ message: ValidationExceptionConstants.PASSWORD_MUST_IS_REQUIRED })
    password: string = '';
}
