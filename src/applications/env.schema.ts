import * as Joi from 'joi';

/**
 * Joi schema for validating the environment variables used in the API.
 */
export const EnvSchema: Joi.ObjectSchema = Joi.object({
    APP_NAME: Joi.string(),
    APP_PORT: Joi.number().integer().port(),
    MONGODB_URL: Joi.string().uri(),
})
    .options({ presence: 'required' })
    .required();
