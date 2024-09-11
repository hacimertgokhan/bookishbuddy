import NextAuth, {DefaultSession} from "next-auth";
import { JWT } from "next-auth/jwt"


declare module "next-auth" {

    interface Session {
        user: {
            address: string,
            username: string,
            email: string,
            id: number,
            avatar: number,
            permission: number,
            jwt: string
        } & DefaultSession["user"]
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string
    }
}