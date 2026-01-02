import { Router, Request, Response } from "express";
import UserModel from "../models/user";
import { generateGuestId, generateGuestUsername } from "../lib/nanoid";
import { signToken, verifyToken } from "../lib/jwt";
import { comparePassword, hashPassword } from "../lib/bcrypt";

export const createGuestAccount = async (_, res: Response) => {
  try {
    const guestId = generateGuestId();
    const username = generateGuestUsername();

    const guestUser = await UserModel.create({
      guestId,
      username,
      isGuest: true,
    });

    const token = await signToken(guestUser._id, true);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: guestUser._id,
        username: guestUser.username,
        isGuest: true,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create guest account" });
  }
};

export const upgradeGuestAccount = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ error: "No guest session found" });

    const decoded = await verifyToken(token);
    const guestUser = await UserModel.findById(decoded.userId);

    if (!guestUser || !guestUser.isGuest) {
      return res.status(400).json({ error: "Invalid guest account" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await hashPassword(password);

    guestUser.email = email;
    guestUser.password = hashedPassword;
    guestUser.username = username || guestUser.username;
    guestUser.isGuest = false;
    guestUser.guestId = undefined;

    await guestUser.save();

    const newToken = signToken(guestUser._id, false);

    return res.status(200).json({
      success: true,
      token: newToken,
      user: {
        id: guestUser._id,
        email: guestUser.email,
        username: guestUser.username,
        isGuest: false,
        stats: guestUser.stats,
      },
      message: "Account upgraded! Your match history has been saved.",
    });
  } catch (error) {
    console.error("Upgrade error:", error);
    res.status(500).json({ error: "Failed to upgrade account" });
  }
};

export const singupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      username,
      isGuest: false,
    });

    const token = await signToken(user._id, false);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isGuest: false,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || user.isGuest) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await comparePassword(user.password!, password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user._id, false);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isGuest: false,
        stats: user.stats,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
