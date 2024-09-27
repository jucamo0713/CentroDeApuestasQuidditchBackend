import { FactoryProvider } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { UserSchema } from '../../../infrastructure/driven-adapters/mongodb/mongo-user.model';
import { getConnectionToken } from '@nestjs/mongoose';
import { MongoDatabaseConstants } from '../../../../shared/applications/providers/mongodb/mongo-database.constants';
import { MongoUserConfigConstants } from './mongo-user-config.constants';
import { UserDto } from '../../../infrastructure/user.dto';

export const MongoUserModelProvider: FactoryProvider<Model<UserDto>> = {
    inject: [getConnectionToken(MongoDatabaseConstants.DATABASE_CONNECTION_NAME)],
    provide: MongoUserConfigConstants.USER_DOCUMENT,
    useFactory: (connection: Connection): Model<UserDto> => {
        return connection.model<UserDto>(MongoUserConfigConstants.USER_COLLECTION_NAME, UserSchema);
    },
};
