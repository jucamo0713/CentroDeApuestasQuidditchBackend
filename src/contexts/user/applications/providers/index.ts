import { Provider } from '@nestjs/common';
import { MongoUserModelProvider } from './mongodb/mongo-user.model.provider';
import { MongoUserRepositoryProvider } from './mongodb/mongo-user.repository.provider';
import { UserUseCaseProvider } from './user.use-case.provider';

export const UserProviders: Array<Provider> = [
    MongoUserModelProvider,
    MongoUserRepositoryProvider,
    UserUseCaseProvider,
];
