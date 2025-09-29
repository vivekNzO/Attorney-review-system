import prisma from './prismaClient.js'

const cleanOrphanClients = async () => {
  try {
    // Fetch all clients
    const clients = await prisma.client.findMany({
      select: { id: true, userId: true },
    });

    for (const client of clients) {
      const userExists = await prisma.user.findUnique({
        where: { id: client.userId },
      });

      if (!userExists) {
        console.log(`Deleting orphan client: ${client.id}`);
        await prisma.client.delete({
          where: { id: client.id },
        });
      }
    }

    console.log("Cleanup of orphan clients completed.");

    // Repeat similarly for Attorneys
    const attorneys = await prisma.attorney.findMany({
      select: { id: true, userId: true },
    });

    for (const attorney of attorneys) {
      const userExists = await prisma.user.findUnique({
        where: { id: attorney.userId },
      });

      if (!userExists) {
        console.log(`Deleting orphan attorney: ${attorney.id}`);
        await prisma.attorney.delete({
          where: { id: attorney.id },
        });
      }
    }

    console.log("Cleanup of orphan attorneys completed.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

cleanOrphanClients();
