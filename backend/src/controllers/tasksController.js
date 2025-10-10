import mongoose from "mongoose";
import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate = null;

  switch (filter) {
    case "today": {
      // Ngày đầu của hôm nay
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      // Tính ngày thứ Hai của tuần hiện tại
      const day = now.getDay(); // 0 (Chủ nhật) -> 6 (Thứ bảy)
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // về thứ Hai
      startDate = new Date(now.getFullYear(), now.getMonth(), diff);
      break;
    }
    case "month": {
      // Ngày đầu của tháng hiện tại
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default:
      startDate = null;
      break;
  }

  // Tạo query chung
  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const data = result[0];
    const tasks = data.tasks || [];
    const activeCount = data.activeCount[0]?.count || 0;
    const completeCount = data.completeCount[0]?.count || 0;

    res.status(200).json({
      tasks,
      activeCount,
      completeCount,
    });
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// 🟢 Tạo task mới
export const createTasks = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.toString().trim()) {
      return res.status(400).json({ message: "Title là bắt buộc" });
    }

    const task = new Task({ title: title.trim() });
    const newTask = await task.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTasks:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// 🟡 Cập nhật task
export const updateTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (status !== undefined) updateData.status = status;
    if (completedAt !== undefined) updateData.completedAt = completedAt;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTasks:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// 🔴 Xóa task
export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
    }

    res.status(200).json({
      message: "Nhiệm vụ đã được xóa",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Lỗi khi gọi deleteTasks:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
