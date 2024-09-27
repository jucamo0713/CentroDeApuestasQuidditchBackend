import { Email } from '../email';
import { User } from '../user';
import { UserId } from '../user.id';

export interface UserRepository {
    create(user: User): void;

    getByEmail(email: Email): Promise<User | undefined>;

    getById(userId: UserId): Promise<User | undefined>;

    getByUsername(username: string): Promise<User | undefined>;

    update(user: User): Promise<User | undefined>;
}
