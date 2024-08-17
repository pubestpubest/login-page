import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
export async function POST(req: Request) {
  const { token } = await req.json();
  try {
    const isValid = jwt.verify(token, JWT_SECRET);
    return Response.json(isValid);
  } catch (error) {
    alert(error);
  }
}
