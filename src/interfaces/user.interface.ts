export interface IUserCreatePayload {
    username: string;
    password: string;
}

export interface IUserRegisterPayload {
    password: string;
    name: string;
    email: string | null;
    dateOfBirth: Date | null;
    contact: string | null;
}