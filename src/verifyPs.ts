import bcrypt from "bcryptjs";
export default async function verifyPs(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}
