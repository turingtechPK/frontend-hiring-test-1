import axios from "@/lib/axios";
import NextAuth, { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "awan" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const response = await axios.post("/auth/login", {
                    username: credentials?.username,
                    password: credentials?.password,
                });

                const user = response.data;

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],

    pages: {
        signIn: "/auth/signIn"
    },

    callbacks: {
        async jwt({ token, user, account }) {
            console.log({ account });
            return { ...token, ...user }
        },

        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    }
};

export default NextAuth(authOptions);