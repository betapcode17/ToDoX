import mongoose from "mongoose";
import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    // lấy toàn bộ từ collection Task, sắp xếp phía query trước khi await
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.toString().trim()) {
      return res.status(400).json({ message: "Title là bắt buộc" });
    }

    const task = new Task({ title: title.toString().trim() });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );
    if (!updateTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(updateTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }

    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
    }

    res.status(200).json({ message: "Nhiệm vụ đã được xóa", task: deleted });
  } catch (error) {
    console.error("Lỗi khi gọi deleteTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
