import express from "express";
import TaskRoute from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5001;
// Tự xác định vị trí đang chạy mã
const __dirname = path.resolve();
// dung server ctrl + c
const app = express();

// middlewares
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use("/api/tasks", TaskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});
