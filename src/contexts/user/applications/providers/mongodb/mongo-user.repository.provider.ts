import { FactoryProvider } from '@nestjs/common';
import { MongoUserRepository } from '../../../infrastructure/driven-adapters/mongodb/mongo-user.repository';
import { MongoUserConfigConstants } from './mongo-user-config.constants';
import { Model } from 'mongoose';
import { UserDto } from '../../../infrastructure/user.dto';

/**
 * ValidationCode repository provider with mongodb.
 */
export const MongoUserRepositoryProvider: FactoryProvider<MongoUserRepository> = {
    inject: [MongoUserConfigConstants.USER_DOCUMENT],
    provide: MongoUserRepository,
    useFactory: (model: Model<UserDto>): MongoUserRepository => {
        return new MongoUserRepository(model);
    },
};
