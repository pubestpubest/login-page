import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  return Response.json(await prisma.users.findMany());
}

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password,
      },
    });
    return Response.json(newUser);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
