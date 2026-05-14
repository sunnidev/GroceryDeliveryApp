import { auth } from "@/src/auth";
import uploadOnCloudinary from "@/src/lib/cloudinary";
import connectDb from "@/src/lib/db";
import { Grocery } from "@/src/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const session = await auth()
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ success: false, message: "You are not authorized to perform this action" }, { status: 400 })
        }

        const formData = await req.formData()
        const name = formData.get('name') as string
        const price = formData.get('price') as string
        const category = formData.get('category') as string
        const unit = formData.get('unit') as string
        const file = formData.get('image') as Blob | null
        // const description = formData.get('description') as string

        let imageUrl
        if (file) {
            imageUrl = await uploadOnCloudinary(file)
        }

        const grocery = await Grocery.create({
            name,
            price,
            category,
            unit,
            image: imageUrl
        })
        return NextResponse.json({ success: true, message: "Grocery added successfully", grocery }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}