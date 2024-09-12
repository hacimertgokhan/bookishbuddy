import process from "process";
import CredentialsProvider from "next-auth/providers/credentials";
import {signIn} from "@/app/actions";
import { PrismaClient } from '@prisma/client'
import {cookies} from "next/headers";
// @ts-ignore
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()

export const authOptions = {
    callbacks: {
        // @ts-ignore
        async session({session}) {
            const e = cookies().get("token");
            const decode = jwt.decode(e?.value);
            const checkEmail = await prisma.users.findUnique({
                where: {
                    email: e?.value,
                },
            })
            session.user.username = decode.username;
            session.user.avatar = decode.avatar;
            session.user.email = decode.email;
            session.user.permission = decode.permission;
            session.user.description = decode.description;
            session.user.id = decode.id;
            return session;
        },
    },
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
                if (sessionData.status === 200) {
                    // @ts-ignore
                    cookies().delete("token");
                    // @ts-ignore
                    cookies().set("token", sessionData.data, {secure: true});
                    return {
                        username: sessionData.username,
                        avatar: sessionData.avatar,
                        id: sessionData.id,
                        permission: sessionData.permission,
                    }
                } else {
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    }
}