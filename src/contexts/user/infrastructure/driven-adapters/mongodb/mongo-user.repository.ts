import { UserRepository } from '../../../domain/model/gateways/user.repository';
import { Model } from 'mongoose';
import { UserDocument } from './mongo-user.model';
import { Email } from '../../../domain/model/email';
import { User } from '../../../domain/model/user';
import { UserId } from '../../../domain/model/user.id';
import { UserMappers } from '../../utils/user.mappers';
import { Logger } from '@nestjs/common';
import { UserDto } from '../../user.dto';

export class MongoUserRepository implements UserRepository {
    private readonly logger: Logger = new Logger(MongoUserRepository.name);

    constructor(private readonly model: Model<UserDto>) {}

    async getById(userId: UserId): Promise<User | undefined> {
        this.logger.log(`[${this.getByEmail.name}] INIT :: userid: ${userId.toString()}`);
        const found: UserDocument | null = await this.model.findOne({ userId: userId.toString() });
        const mapped: User | undefined = found ? UserMappers.MongoModel2User(found) : undefined;
        this.logger.log(`[${this.getByEmail.name}] FINISH ::`);
        return mapped;
    }

    async getByEmail(email: Email): Promise<User | undefined> {
        this.logger.log(`[${this.getByEmail.name}] INIT :: email: ${email.toString()}`);
        const found: UserDocument | null = await this.model.findOne({ email: email.toString() });
        const mapped: User | undefined = found ? UserMappers.MongoModel2User(found) : undefined;
        this.logger.log(`[${this.getByEmail.name}] FINISH ::`);
        return mapped;
    }

    async getByUsername(username: string): Promise<User | undefined> {
        this.logger.log(`[${this.getByUsername.name}] INIT :: username: ${username}`);
        const found: UserDocument | null = await this.model.findOne({ username: username.toString() });
        const mapped: User | undefined = found ? UserMappers.MongoModel2User(found) : undefined;
        this.logger.log(`[${this.getByUsername.name}] FINISH ::`);
        return mapped;
    }

    async update(user: User): Promise<User | undefined> {
        this.logger.log(`[${this.update.name}] INIT ::`);
        const { userId, ...data } = UserMappers.user2MongoModel(user);
        const updated: UserDocument | null = await this.model.findOneAndUpdate(
            { userId },
            {
                ...data,
            },
            { new: true },
        );
        const mapped: User | undefined = updated ? UserMappers.MongoModel2User(updated) : undefined;
        this.logger.log(`[${this.update.name}] FINISH ::`);
        return mapped;
    }

    async create(user: User): Promise<void> {
        this.logger.log(`[${this.create.name}] INIT ::`);
        const data = UserMappers.user2MongoModel(user);
        const userToSave = new this.model(data);
        await userToSave.save();
        this.logger.log(`[${this.create.name}] FINISH ::`);
    }
}
