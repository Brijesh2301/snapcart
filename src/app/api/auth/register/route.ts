import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // ← changed from "bcrypt"
import connectDb from "@/src/lib/db";
import User from "@/src/models/user.model";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password Must be 6 characters" },
        { status: 400 },
      );
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const user=await User.create({
    name,email,password:hashedPassword
    })
    return NextResponse.json({ message: "User Created",user }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) }, // ← add this
      { status: 500 }
    );
}
}
//name,email, password frontend
//if user is exists throw error Please use new email or create new account
//passowrd 6 Character
