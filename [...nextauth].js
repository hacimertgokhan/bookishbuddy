import process from "process";
import jwt from 'jsonwebtoken'
import {signIn} from "./app/actions.js";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24*60*60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "database",
            name: "database",
            credentials: {
                email: {
                    label: "Email: ",
                    type: "text",
                    placeholder: "Enter your email address.",
                },
                password: {
                    label: "Password: ",
                    type: "password",
                    placeholder: "Enter your password.",
                }
            },
            async authorize(credentials) {
                const sessionData = await signIn("http://localhost:8000/auth/login", credentials?.email, credentials?.password);
                const readData = await jwt.decode(sessionData.data.jwt);
                if(sessionData.status === 200) {
                    return {
                        username: readData.username,
                        avatar: readData.avatar,
                        id: readData.id,
                        permission: readData.permission,
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async session({session}) {
            session.user.username = '';
            session.user.permission = '';
            session.user.id = '';
            session.user.jwt = '';
            return session;
        },
    },
}

export default NextAuth(authOptions)
