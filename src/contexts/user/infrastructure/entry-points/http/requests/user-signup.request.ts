import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidationExceptionConstants } from '../../../../../shared/domain/model/exceptions/validation-exception.constants';

export class UserSignupRequest {
    @ApiProperty({ description: "The user's email address." })
    @IsEmail({}, { message: ValidationExceptionConstants.EMAIL_NOT_VALID })
    @IsString({ message: ValidationExceptionConstants.EMAIL_MUST_BE_STRING })
    @IsNotEmpty({ message: ValidationExceptionConstants.EMAIL_IS_REQUIRED })
    email: string = '';

    @ApiProperty({ description: "The user's full name." })
    @IsString({ message: ValidationExceptionConstants.FULL_NAME_PARAM_MUST_BE_STRING })
    @IsNotEmpty({ message: ValidationExceptionConstants.FULL_NAME_PARAM_IS_REQUIRED })
    fullName: string = '';

    @ApiProperty({ description: "The user's password.", required: false })
    @IsString({ message: ValidationExceptionConstants.PASSWORD_MUST_BE_STRING })
    @IsNotEmpty({ message: ValidationExceptionConstants.PASSWORD_MUST_IS_REQUIRED })
    password: string = '';

    @ApiProperty({ description: "The user's password.", required: false })
    @IsString({ message: ValidationExceptionConstants.PASSWORD_MUST_BE_STRING })
    @IsNotEmpty({ message: ValidationExceptionConstants.PASSWORD_MUST_IS_REQUIRED })
    username: string = '';
}
