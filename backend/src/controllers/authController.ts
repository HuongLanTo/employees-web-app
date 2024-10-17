import { Request, Response } from "express";
import { register, login } from "../services/authService";

export const userRegister = async (req: Request, res: Response) => {
  const user = await register(req.body.username, req.body.password);
  res.status(200).json(user);
};

export const userLogin = async (req: Request, res: Response) => {
  const token = await login(req.body.username, req.body.password);
  res.json({ token });
};
