import prisma from "./prismaClient.js";


async function migrateMappingsToUserId() {
  try {
    const mappings = await prisma.attorneyClientMapping.findMany();

    for (const map of mappings) {
      const attorney = await prisma.attorney.findUnique({
        where: { id: map.attorneyId },
      });
      const client = await prisma.client.findUnique({
        where: { id: map.clientId },
      });

      if (!attorney || !client) {
        console.log("Skipping mapping:", map.id);
        continue;
      }

      await prisma.attorneyClientMapping.update({
        where: { id: map.id },
        data: {
          attorneyId: attorney.userId,
          clientId: client.userId,
        },
      });

      console.log(`Updated mapping ${map.id}`);
    }

    console.log("Migration complete!");
  } catch (error) {
    console.log(error);
  }
}

migrateMappingsToUserId();
