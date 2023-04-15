import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import indexRouter from "./routes/index";
import nftRoutes from "./routes/nftRoutes";
import ftRoutes from "./routes/ftRoutes";
import chatGroupRoutes from "./routes/chatGroupRoutes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/api/nft", nftRoutes);
app.use("/api/ft", ftRoutes);
app.use("/api/chatgroup", chatGroupRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

export default app;
