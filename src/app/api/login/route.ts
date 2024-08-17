import verifyPs from "@/verifyPs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return Response.json({ success: false, message: "User not found" });
    const isPasswordValid = await verifyPs(password, user.password);
    if (!isPasswordValid)
      return Response.json({ success: false, message: "Wrong password" });
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        password: user.password,
        role: "Admin",
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return Response.json({ success: true, token });
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ success: false, message: error.message });
    return Response.json({ success: false, message: error });
  }
}
