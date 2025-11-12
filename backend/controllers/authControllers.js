import prisma from "../config/prismaClient.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";
import { getRandomAvatar } from "../../frontend/src/utils/avatar.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handleSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleName,
      licenseNumber,
      profilePhoto,
    } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      if (existingUser.status === "Pending") {
        return res
          .status(403)
          .json({ message: "Your account is not approved yet" });
      } else {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
    }

    const role = await prisma.role.findUnique({
      where: { roleName: roleName || "Client" },
    });

    if (!role) return res.status(400).json({ message: "Invalid role" });
    const hashedPassword = await bcrypt.hash(password, 10);

    let status = "Approved";
    if (role.roleName === "Attorney") {
      status = "Pending";
    }

    const profilePic = profilePhoto || getRandomAvatar();

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId: role.id,
        status,
        licenseNumber,
        profilePhoto: profilePic,
      },
      include: { role: true },
    });

    if (role.roleName === "Client") {
      await prisma.client.create({
        data: { userId: user.id },
      });
    }

    if (status === "Pending") {
      return res.status(201).json({
        message: "Signup successful. Awaiting admin approval.",
      });
    }

    const token = generateToken(user, res);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.roleName,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    if (user.status !== "Approved") {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet" });
    }
    const token = generateToken(user, res);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.roleName,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
