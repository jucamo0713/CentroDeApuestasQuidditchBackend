import { HydratedDocument, Schema, SchemaDefinition } from 'mongoose';
import { UserDto } from '../../user.dto';

export type UserDocument = HydratedDocument<UserDto>;
const definition: Required<SchemaDefinition<UserDto>> = {
    email: {
        index: 'hashed',
        required: true,
        type: String,
        unique: true,
    },
    fullName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    userId: {
        index: 'hashed',
        required: true,
        type: String,
        unique: true,
    },
    username: {
        index: 'hashed',
        required: true,
        type: String,
        unique: true,
    },
};

/**
 * Mongoose schema for the users.
 */
export const UserSchema: Schema<UserDto> = new Schema(definition, { timestamps: true });
