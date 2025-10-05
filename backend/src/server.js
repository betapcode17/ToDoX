import express from "express";
import TaskRoute from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5001;
// dung server ctrl + c
const app = express();

app.use(express.json());

app.use("/api/tasks", TaskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});
