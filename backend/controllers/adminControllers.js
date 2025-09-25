import prisma from "../config/prismaClient.js";

export const getPendingApprovals = async (req, res) => {
  try {
    const pendingRequests = await prisma.user.findMany({
      where: { status: "Pending" },
    });
    if (pendingRequests.length === 0)
      return res.status(404).json({ message: "No pending requests" });
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const approveAttorney = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: "Approved" },
      include: { role: true },
    });
    if (!user) return res.status(404).json({ message: "Request not found" });
    await prisma.attorney.create({
        data:{userId:user.id}
    });
    res.status(200).json({ message: "Attorney approved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectAttorney = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: "Rejected" },
      include: { role: true },
    });
    if (!user) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: "Attorney rejected successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
