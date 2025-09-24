import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.role.create({
        role:"Admin"
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })