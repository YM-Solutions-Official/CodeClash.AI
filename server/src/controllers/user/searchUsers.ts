import { Request, Response } from "express";
import { UserModel } from "../../models/user";

// Escape regex characters
const escapeRegExp = (string: string) => {
  return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

export const searchUsers = async (req: Request, res: Response) => {
  // Convert q to string safely
  const qParam = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;

  if (!qParam || typeof qParam !== "string") {
    return res.status(400).json({ msg: 'Search query "q" is required.' });
  }

  try {
    const safeQuery = escapeRegExp(qParam);
    const queryRegex = new RegExp(`^${safeQuery}`, "i");

    const users = await UserModel.find({ name: queryRegex })
      .select("name avatar")
      .limit(10);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
