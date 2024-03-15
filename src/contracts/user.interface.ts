export interface IUserCreatePayload {
    username: string;
    institutionId: string;
}

export interface IUserRegisterPayload {
    password: string;
    name: string;
    email: string | null;
    dateOfBirth: Date | null;
    contact: string | null;
}