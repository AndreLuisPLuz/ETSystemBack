export interface IUserPayload {
    username: string;
    password: string;
    name: string | null;
    email: string | null;
    dateOfBirth: Date | null;
    contact: string | null;
}