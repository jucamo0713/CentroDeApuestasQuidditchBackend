import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ValidationExceptionConstants } from '../../../../domain/model/exceptions/validation-exception.constants';

export class MoneyGenericRequest {
    @ApiProperty({ description: '' })
    @Min(0, { message: ValidationExceptionConstants.GALLEONS_MUST_BE_POSITIVE })
    @IsNumber({}, { message: ValidationExceptionConstants.GALLEONS_MUST_BE_NUMBER })
    @IsNotEmpty({ message: ValidationExceptionConstants.GALLEONS_IS_REQUIRED })
    galleons: number = 0;

    @ApiProperty({ description: '' })
    @Min(0, { message: ValidationExceptionConstants.SICKLES_MUST_BE_POSITIVE })
    @IsNumber({}, { message: ValidationExceptionConstants.SICKLES_MUST_BE_NUMBER })
    @IsNotEmpty({ message: ValidationExceptionConstants.SICKLES_IS_REQUIRED })
    sickles: number = 0;

    @ApiProperty({ description: '', required: false })
    @Min(0, { message: ValidationExceptionConstants.KNUTS_MUST_BE_POSITIVE })
    @IsNumber({}, { message: ValidationExceptionConstants.KNUTS_MUST_BE_NUMBER })
    @IsNotEmpty({ message: ValidationExceptionConstants.KNUTS_IS_REQUIRED })
    knuts: number = 0;
}
