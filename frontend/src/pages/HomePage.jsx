import React, { useEffect, useState } from "react";

import AddTask from "../components/AddTask.jsx";
import StatsAndFilters from "../components/StatsAndFilters.jsx";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination.jsx";
import DateTimeFilter from "../components/DateTimeFilter.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { toast } from "sonner";

import api from "@/lib/axios.js";

const HomePage = () => {
  //state lưu danh sách nhiệm vụ từ backend
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchTasks();
  }, []);

  // goi api lay ds nv
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");

      setTaskBuffer(res.data.tasks);

      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  };

  const handleTaskChange = () => {
    fetchTasks();
  };

  // biến danh sách nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "completed";
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl m-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />
          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChange} />
          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCounts={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={filteredTasks}
            handleTaskChanged={handleTaskChange}
          />
          {/* Phân trang và lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          {/* Chân trang */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
