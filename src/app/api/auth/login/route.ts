import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword, verifyPassword, createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const db = await getDb();
    const adminCollection = db.collection("admin_users");

    // Find admin user
    let admin = await adminCollection.findOne({ email });

    // If no admin exists yet, check against env credentials and create one
    if (!admin) {
      const envEmail = process.env.ADMIN_EMAIL;
      const envPassword = process.env.ADMIN_PASSWORD;

      if (email === envEmail && password === envPassword) {
        const hashedPw = await hashPassword(password);
        await adminCollection.insertOne({
          email,
          password: hashedPw,
          role: "admin",
          createdAt: new Date(),
        });
        admin = await adminCollection.findOne({ email });
      }
    }

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create token and set cookie
    const token = createToken({ email: admin.email, role: admin.role });
    await setAuthCookie(token);

    return NextResponse.json({ success: true, email: admin.email });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
