import prisma from "./prismaClient.js";

const migrateLicenseNumbers = async () => {
  const clients = await prisma.attorney.findMany({
    where: { licenseNumber: { not: null } },
  });

  for (const c of clients) {
    // Convert only if it's a number
    if (typeof c.licenseNumber === "number") {
      await prisma.attorney.update({
        where: { id: c.id },
        data: { licenseNumber: String(c.licenseNumber) },
      });
      console.log(`Updated licenseNumber for attorney ${c.id}`);
    }
  }

  console.log("Migration complete!");
  process.exit(0);
};

migrateLicenseNumbers();
