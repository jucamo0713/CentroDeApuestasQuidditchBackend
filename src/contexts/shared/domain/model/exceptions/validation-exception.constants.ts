import { UserErrorMessagesConstants } from '../../../../user/domain/model/exceptions/user-error-messages.constants';

export enum ValidationExceptionConstants {
    EMAIL_NOT_VALID = UserErrorMessagesConstants.EMAIL_NOT_VALID,
    EMAIL_MUST_BE_STRING = 'El correo debe ser un string',
    EMAIL_IS_REQUIRED = 'El correo es requerido',
    FULL_NAME_PARAM_MUST_BE_STRING = 'EL nombre completo debe ser un texto',
    FULL_NAME_PARAM_IS_REQUIRED = 'EL nombre completo es requerido',
    PASSWORD_MUST_BE_STRING = 'La Contraseña debe ser un texto',
    PASSWORD_MUST_IS_REQUIRED = 'La Contraseña es requerida',
}
