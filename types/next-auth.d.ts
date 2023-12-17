import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            id: number;
            email: string;
            username: string;
            access_token: string;
            refresh_token: string;
        }
    }
}