import prisma from "../config/prismaClient.js";

export const addClientToAttorney = async (req, res) => {
  try {
    const { clientId } = req.body;
    const attorneyId = req.user.attorney.id;
    // console.log(req.user)
    if (!attorneyId)
      return res.status(403).json({ message: "Not an attorney"});
    const clientLink = await prisma.AttorneyClientMapping.create({
        data:{
            attorneyId:attorneyId,
            clientId:clientId
        }
    });
    res.status(201).json({message:"Client assigned to you successfully",clientLink})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
