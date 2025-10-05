import mongoose from "mongoose";

// Định nghĩa cấu trúc dữ liệu cho 1 task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // xóa khoảng trắng
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "complete"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt và updatedAt tự động thêm vào
  }
);

// Khi status chuyển thành "complete" cập nhật completedAt, ngược lại reset về null
taskSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "complete") {
      this.completedAt = new Date();
    } else {
      this.completedAt = null;
    }
  }
  next();
});

// Từ schema định nghĩa sinh ra model mới
const Task = mongoose.model("Task", taskSchema);
export default Task;
