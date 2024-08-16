import verifyPs from "@/verifyPs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) return Response.json(false);
    return Response.json(await verifyPs(password, user.password));
  } catch (error) {
    return Response.json(error);
  }
}
