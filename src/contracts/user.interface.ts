export interface IUserCreatePayload {
    username: string;
    password: string;
    institutionId: string;
}

export interface IUserRegisterPayload {
    password: string;
    name: string;
    email: string | null;
    dateOfBirth: Date | null;
    contact: string | null;
}

export interface IUserResponse {
    username: string;
    name: string | null;
    email: string | null;
    dateOfBirth: Date | null;
    contact: string | null;
}