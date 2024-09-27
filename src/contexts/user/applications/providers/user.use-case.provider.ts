import { FactoryProvider } from '@nestjs/common';
import { UserUseCase } from '../../domain/usecase/user.use-case';
import { MongoUserRepository } from '../../infrastructure/driven-adapters/mongodb/mongo-user.repository';
import { UserRepository } from '../../domain/model/gateways/user.repository';
import { NestCqrsCaller } from '../../../core/infrastructure/driven-adapters/nestjs/cqrs/nest-cqrs-caller.service';
import { CqrsCaller } from '../../../core/domain/model/gateways/cqrs-caller';

/**
 * Provider of user use cases.
 */
export const UserUseCaseProvider: FactoryProvider<UserUseCase> = {
    inject: [NestCqrsCaller, MongoUserRepository],
    provide: UserUseCase,
    useFactory: (cqrsCaller: CqrsCaller, repository: UserRepository): UserUseCase => {
        return new UserUseCase(cqrsCaller, repository);
    },
};
