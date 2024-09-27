import * as Joi from 'joi';

export const EnvSchema: Joi.ObjectSchema = Joi.object({
    APP_GLOBAL_PREFIX: Joi.string(),
    APP_PORT: Joi.number().integer().port(),
    AUTH_REFRESH_TOKEN_EXPIRATION: Joi.number().integer().positive(),
    AUTH_REFRESH_TOKEN_SECRET: Joi.string(),
    AUTH_TOKEN_EXPIRATION: Joi.number().integer().positive(),
    AUTH_TOKEN_SECRET: Joi.string(),
    DEFAULT_TIMEOUT_MS: Joi.number().integer().positive(),
    MONGODB_URL: Joi.string(),
    SWAGGER_DESCRIPTION: Joi.string(),
    SWAGGER_PATH: Joi.string(),
    SWAGGER_TITLE: Joi.string(),
    USER_PASSWORD_HASH_SALT: Joi.string(),
})
    .options({ presence: 'required' })
    .required();
