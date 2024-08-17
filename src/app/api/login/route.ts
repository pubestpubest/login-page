import verifyPs from "@/verifyPs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const user = await prisma.users.findUnique({
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
