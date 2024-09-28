import { UserErrorMessagesConstants } from '../../../../user/domain/model/exceptions/user-error-messages.constants';

export enum ValidationExceptionConstants {
    EMAIL_NOT_VALID = UserErrorMessagesConstants.EMAIL_NOT_VALID,
    EMAIL_MUST_BE_STRING = 'El correo debe ser un string',
    EMAIL_IS_REQUIRED = 'El correo es requerido',
    FULL_NAME_PARAM_MUST_BE_STRING = 'EL nombre completo debe ser un texto',
    FULL_NAME_PARAM_IS_REQUIRED = 'EL nombre completo es requerido',
    PASSWORD_MUST_BE_STRING = 'La Contraseña debe ser un texto',
    PASSWORD_MUST_IS_REQUIRED = 'La Contraseña es requerida',
    GALLEONS_MUST_BE_POSITIVE = 'El numero de galeones debe ser positivo',
    GALLEONS_MUST_BE_NUMBER = 'Los galeones deben ser un numero',
    GALLEONS_IS_REQUIRED = 'Los galeones son requeridos',
    SICKLES_MUST_BE_POSITIVE = 'El numero de sickles debe ser positivo',
    SICKLES_MUST_BE_NUMBER = 'Los sickles deben ser un numero',
    SICKLES_IS_REQUIRED = 'Los sickles son requeridos',
    KNUTS_MUST_BE_POSITIVE = 'El numero de knuts debe ser positivo',
    KNUTS_MUST_BE_NUMBER = 'Los knuts deben ser un numero',
    KNUTS_IS_REQUIRED = 'Los knuts son requeridos',
}
