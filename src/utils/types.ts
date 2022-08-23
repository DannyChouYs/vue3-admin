export interface registerType {
    name: string;
    email: string;
    password: string;
    password2: string;
    identity: string;
}

export interface loginType {
    email: string;
    password: string;
}

export interface userType {
    avatar: string;
    exp: number;
    iat: number;
    id: string;
    identity: string;
    name: string;
}
