import bcrypt from "bcryptjs";

export default async function hashPassword(password: string) {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
