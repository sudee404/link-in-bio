export interface User {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    account_type: string;
    recovery_email: string | null;
    bio: string | null;
    phone: string | null;
    image: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserContextType{
    user?: User;
}