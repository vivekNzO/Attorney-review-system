import prisma from "../config/prismaClient.js";

export const getAttorneyInfo = async (req, res) => {
  try {
    const { attorneyId } = req.params;
    const attorney = await prisma.attorney.findUnique({
      where: { id:attorneyId },
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
    res.status(200).json(attorney);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addClientToAttorney = async (req, res) => {
  try {
    const { clientEmail } = req.body;
    const attorneyId = req.user.attorney.id;
    // console.log(req.user.attorney)
    if (!attorneyId)
      return res.status(403).json({ message: "Not an attorney" });

    const client = await prisma.client.findFirst({
      where: {
        user: {
          email: clientEmail,
        },
      },
    });

    // console.log(client)

    if (!client) return res.status(404).json({ message: "Client not found" });

    const existingLink = await prisma.attorneyClientMapping.findFirst({
      where: { attorneyId, clientId: client.id },
    });

    if (existingLink) {
      return res.status(400).json({ message: "Client already assigned" });
    }
    const clientLink = await prisma.attorneyClientMapping.create({
      data: {
        attorneyId: attorneyId,
        clientId: client.id,
      },
    });
    res
      .status(201)
      .json({ message: "Client assigned to you successfully", clientLink });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addClientReview = async (req, res) => {
  try {
    const { clientId } = req.params;
    const attorneyId = req.user.attorney.id;
    const {
      punctuality,
      behaviour,
      paymentTimeliness,
      preparedness,
      reliability,
      feedback
    } = req.body;
    if (
      punctuality == null ||
      behaviour == null ||
      paymentTimeliness == null ||
      preparedness == null ||
      reliability == null
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const mapping = await prisma.attorneyClientMapping.findFirst({
      where: {
        attorney:{id:attorneyId},
        client:{id:clientId}
      },
    });

    // console.log(mapping)

    if (!mapping)
      return res
        .status(403)
        .json({ message: "Client is not assigned under you" });

      const existingReview = await prisma.review.findFirst({
        where:{attorneyId,clientId}
      })

      if(existingReview){
        return res.status(400).json({message:"You have already reviewed this client"})
      }

    const review = await prisma.review.create({
      data: {
        attorneyId,
        clientId,
        punctuality,
        behaviour,
        paymentTimeliness,
        preparedness,
        reliability,
        feedback
      },
    });
    res.status(201).json({ message: "Review added successfully" }, review);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllAttorneys = async (req, res) => {
  try {
    const attorneys = await prisma.attorney.findMany({
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
    res.status(200).json(attorneys);
  } catch (error) {
    console.log(error);
  }
};


export const getClientsUnderAttorney = async (req, res) => {
  try {
    const attorneyId = req.user.attorney.id;

    const mappings = await prisma.attorneyClientMapping.findMany({
      where: { attorneyId },
      include: {
        client: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Filter out broken mappings (client = null)
    const clients = mappings
      .map(m => m.client)
      .filter(c => c !== null);

    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
