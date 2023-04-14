import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response): void => {
  res.json({ message: "Welcome to the REST API!" });
};
