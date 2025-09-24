import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function initDB() {
  try {
    await prisma.$connect();
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
}

export default initDB