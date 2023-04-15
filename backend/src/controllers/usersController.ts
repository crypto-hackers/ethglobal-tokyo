import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response): void => {
  // ユーザー情報を取得し、JSON形式で返す処理をここに実装してください。
  res.json({ message: "Get all users" });
};

export const createUser = (req: Request, res: Response): void => {
  // ユーザー情報を受け取り、データベースに保存する処理をここに実装してください。
  res.json({ message: "Create a new user" });
};
