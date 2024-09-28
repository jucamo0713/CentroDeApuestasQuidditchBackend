export interface UserDto {
    balance: {
        galleons: number;
        knuts: number;
        sickles: number;
    };
    email: string;
    fullName: string;
    password: string;
    userId: string;
    username: string;
}
