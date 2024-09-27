import { User } from '../../domain/model/user';
import { UserId } from '../../domain/model/user.id';
import { Email } from '../../domain/model/email';
import { Password } from '../../domain/model/password';
import { UserDto } from '../user.dto';

export abstract class UserMappers {
    static user2MongoModel(user: User): UserDto {
        return {
            email: user.email.toString(),
            fullName: user.fullName,
            password: user.password.toString(),
            userId: user.userId.toString(),
            username: user.username,
        };
    }

    static MongoModel2User(dto: UserDto): User {
        return new User(
            new UserId(dto.userId),
            new Email(dto.email),
            dto.fullName,
            dto.username,
            new Password(dto.password),
        );
    }
}
