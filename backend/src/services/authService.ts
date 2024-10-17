import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword });
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};
