const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clearTable() {
  try {
    const deleteUsers = await prisma.users.deleteMany({});
    console.log(`Deleted ${deleteUsers.count} users`);
  } catch (error) {
    console.error("Error clearing table:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearTable();
