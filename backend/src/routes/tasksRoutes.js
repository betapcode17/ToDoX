import express from "express";
import {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} from "../controllers/tasksController.js";
const router = express.Router();

// tao api endpoint
router.get("/", getAllTasks);

//npm install nodemon
router.post("/", createTasks);

router.put("/:id", updateTasks);

router.delete("/:id", deleteTasks);
export default router;
