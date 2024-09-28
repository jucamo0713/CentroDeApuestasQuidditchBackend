import { UserRepository } from '../model/gateways/user.repository';
import { Email } from '../model/email';
import { User } from '../model/user';
import { UserNotFoundException } from '../model/exceptions/user-not-found.exception';
import { CqrsCaller } from '../../../core/domain/model/gateways/cqrs-caller';
import { Password } from '../model/password';
import { AuthTokens } from '../../../auth/domain/model/auth-tokens';
import { UserId } from '../model/user.id';
import { GenerateAuthTokensCommand } from '../../../auth/domain/usecase/commands/generate-auth-tokens/generate-auth-tokens.command';
import { UsernameAlreadyExistException } from '../model/exceptions/username-already-exist.exception';
import { EmailAlreadyExistException } from '../model/exceptions/email-already-exist.exception';
import { PasswordNotValidException } from '../model/exceptions/password-not-valid.exception';
import { UserErrorMessagesConstants } from '../model/exceptions/user-error-messages.constants';
import { HttpStatus, Logger } from '@nestjs/common';
import { Balance } from '../model/balance';

export class UserUseCase {
    private readonly logger: Logger = new Logger(UserUseCase.name);

    constructor(
        private readonly cqrsCaller: CqrsCaller,
        private readonly repository: UserRepository,
    ) {}

    getById(userId: UserId, throwExceptionIfNotFound?: true): Promise<User>;
    getById(userId: UserId, throwExceptionIfNotFound?: boolean): Promise<User | undefined>;
    async getById(userId: UserId, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
        this.logger.log(`[${this.getById.name}] INIT :: userId: ${userId.toString()}`);
        const user: User | undefined = await this.repository.getById(userId);
        if (throwExceptionIfNotFound && !user) {
            throw new UserNotFoundException(`${UserUseCase.name} - ${this.getById.name}`);
        }
        this.logger.log(`[${this.getById.name}] FINISH ::`);
        return user;
    }

    getByEmail(email: Email, throwExceptionIfNotFound?: true): Promise<User>;
    getByEmail(email: Email, throwExceptionIfNotFound?: boolean): Promise<User | undefined>;
    async getByEmail(email: Email, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
        this.logger.log(`[${this.getByEmail.name}] INIT :: email: ${email.toString()}`);
        const user: User | undefined = await this.repository.getByEmail(email);
        if (throwExceptionIfNotFound && !user) {
            throw new UserNotFoundException(`${UserUseCase.name} - ${this.getByEmail.name}`);
        }
        this.logger.log(`[${this.getByEmail.name}] FINISH ::`);
        return user;
    }

    getByUsername(username: string, throwExceptionIfNotFound?: true): Promise<User>;
    getByUsername(username: string, throwExceptionIfNotFound?: boolean): Promise<User | undefined>;
    async getByUsername(username: string, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
        this.logger.log(`[${this.getByUsername.name}] INIT :: username: ${username}`);
        const user: User | undefined = await this.repository.getByUsername(username);
        if (throwExceptionIfNotFound && !user) {
            throw new UserNotFoundException(`${UserUseCase.name} - ${this.getByUsername.name}`);
        }
        this.logger.log(`[${this.getByUsername.name}] FINISH ::`);
        return user;
    }

    async changePassword(userId: UserId, currentPassword: string, password: string): Promise<void> {
        this.logger.log(`[${this.changePassword.name}] INIT :: id: ${userId?.toString()}`);
        const user: User = await this.getById(userId);
        const oldPassword: Password = Password.generate(currentPassword, user.userId, false);
        const newPassword: Password = Password.generate(password, user.userId);
        if (!oldPassword.compare(user.password)) {
            throw new PasswordNotValidException(
                UserUseCase.name,
                UserErrorMessagesConstants.CURRENT_PASSWORD_NOT_VALID,
                HttpStatus.FORBIDDEN,
            );
        }
        if (newPassword.compare(user.password)) {
            throw new PasswordNotValidException(
                UserUseCase.name,
                UserErrorMessagesConstants.PREVIOUS_PASSWORD_CAN_NOT_BE_USED,
            );
        }
        user.password = newPassword;
        await this.repository.update(user);
        this.logger.log(`[${this.changePassword.name}] FINISH ::`);
    }

    async validateEmailAvailability(email: Email): Promise<boolean> {
        this.logger.log(`[${this.validateEmailAvailability.name}] INIT :: email: ${email.toString()}`);
        const user: User | undefined = await this.getByEmail(email, false);
        const isAvailable: boolean = !user;
        this.logger.log(`[${this.validateEmailAvailability.name}] FINISH ::`);
        return isAvailable;
    }

    async validateUsernameAvailability(username: string, userId?: UserId | undefined): Promise<boolean> {
        this.logger.log(`[${this.validateUsernameAvailability.name}] INIT :: username: ${username}`);
        const user: User | undefined = await this.getByUsername(username, false);
        const isAvailable: boolean = !user || user.userId.toString() === userId?.toString();
        this.logger.log(`[${this.validateUsernameAvailability.name}] FINISH ::`);
        return isAvailable;
    }

    async signup(email: Email, username: string, fullName: string, password: Password): Promise<AuthTokens> {
        this.logger.log(`[${this.signup.name}] INIT :: email: ${email.toString()}`);

        if (!(await this.validateUsernameAvailability(username))) {
            throw new UsernameAlreadyExistException(UserUseCase.name);
        }
        if (!(await this.validateEmailAvailability(email))) {
            throw new EmailAlreadyExistException(UserUseCase.name);
        }

        const userId: UserId = new UserId(UserId.generate());
        const user: User = new User(
            userId,
            email,
            fullName,
            username,
            new Balance(0, 0, 0),
            Password.generate(password.toString(), userId),
        );
        this.repository.create(user);
        const tokens: AuthTokens = await this.cqrsCaller.dispatch<GenerateAuthTokensCommand, AuthTokens>(
            new GenerateAuthTokensCommand(user.userId),
            true,
            false,
        );
        this.logger.log(`[${this.signup.name}] FINISH ::`);
        return tokens;
    }

    async rechargeById(userId: UserId, balanceToRecharge: Balance): Promise<Balance> {
        this.logger.log(`[${this.rechargeById.name}] INIT :: userId: ${userId.toString()}`);
        const user = await this.getById(userId);
        const currentBalance = user.balance;
        let knuts = currentBalance.knuts + balanceToRecharge.knuts;
        const aux1 = Math.floor(knuts / 29);
        knuts = knuts % 29;
        let sickles = currentBalance.sickles + balanceToRecharge.sickles + aux1;
        const aux2 = Math.floor(sickles / 17);
        sickles = sickles % 17;
        const galleons = currentBalance.galleons + balanceToRecharge.galleons + aux2;
        user.balance = new Balance(galleons, sickles, knuts);
        const updated = await this.repository.update(user);
        this.logger.log(`[${this.rechargeById.name}] FINISH ::`);
        return updated!.balance;
    }
}
