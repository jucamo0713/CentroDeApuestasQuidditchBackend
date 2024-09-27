import { HydratedDocument, Schema, SchemaDefinition } from 'mongoose';
import { UserDto } from '../../user.dto';

export type UserDocument = HydratedDocument<UserDto>;
const definition: Required<SchemaDefinition<UserDto>> = {
    email: {
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
        required: true,
        type: String,
        unique: true,
    },
    username: {
        required: true,
        type: String,
        unique: true,
    },
};

export const UserSchema: Schema<UserDto> = new Schema(definition, { timestamps: true });
UserSchema.index({
    email: 'hashed',
});
UserSchema.index({
    username: 'hashed',
});
UserSchema.index({
    userId: 'hashed',
});
