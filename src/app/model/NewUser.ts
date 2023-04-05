export interface NewUser {
    id?: number;
    password?: string;
    confirmPassword?:string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    clientId?: number;
    storeId?: number;
}