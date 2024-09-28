import { User } from '../../domain/model/user';
import { UserId } from '../../domain/model/user.id';
import { Email } from '../../domain/model/email';
import { Password } from '../../domain/model/password';
import { UserDto } from '../user.dto';
import { Balance } from '../../domain/model/balance';

export abstract class UserMappers {
    static user2MongoModel(user: User): UserDto {
        return {
            balance: {
                galleons: user.balance.galleons,
                knuts: user.balance.knuts,
                sickles: user.balance.sickles,
            },
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
            new Balance(dto.balance.galleons, dto.balance.sickles, dto.balance.knuts),
            new Password(dto.password),
        );
    }
}
