import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import { error } from "console"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await connectDb()
                const email = credentials.email
                const password = credentials.password as string
                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error("No user found with the email")
                }
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    throw new Error("Invalid password")
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role 
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({user, account}) {
            if(account?.provider === "google") {
                await connectDb()
                let userExists = await User.findOne({ email: user.email })
                if(!userExists) {
                    userExists = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    })
                }
                user.id = userExists._id.toString()
                user.role = userExists.role
            }
            return true
        },

        async jwt({ token, user ,trigger,session}) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.role = user.role
            }
            if(trigger == "update") { 
                token.role = session.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string,
                    session.user.name = token.name as string,
                    session.user.email = token.email as string,
                    session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.AUTH_SECRET
})