import connectDb from "@/src/lib/db";
import User from "@/src/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { name, email, password } = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            // role: 'user'
        });

        return NextResponse.json({ message: "User registered successfully", user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}
