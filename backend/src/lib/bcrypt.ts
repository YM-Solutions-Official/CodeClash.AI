import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  userPassword: string,
  password: string
) => {
  const isValid = await bcrypt.compare(password, userPassword);

  return isValid;
};
