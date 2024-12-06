export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    bio: string | null;
    phone: string | null;
    location: string | null;
    image: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserContextType{
    user?: User;
}