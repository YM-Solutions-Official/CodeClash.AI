import jwt from "jsonwebtoken";

export const verifyToken = async (
  token: string
): Promise<{ userId: string; isGuest: boolean }> => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  return decoded;
};

export const signToken = async (userId: string, isGuest: boolean) => {
  const token = jwt.sign({ userId: userId, isGuest }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return token;
};
