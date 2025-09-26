import prisma from "../config/prismaClient.js";

export const getAllClients = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClientInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    if (!client) return res.status(404).json({ message: "Client not found" });
    const aggregatedReviews = await prisma.review.aggregate({
        _avg:{
            punctuality:true,
            behaviour: true,
            paymentTimeliness: true,
            preparedness: true,
            reliability:true,
        },
        where:{clientId:id}
    });
    res.status(200).json({client,aggregatedReviews});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
