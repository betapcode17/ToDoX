import React, { useEffect, useState } from "react";

import AddTask from "../components/AddTask.jsx";
import StatsAndFilters from "../components/StatsAndFilters.jsx";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination.jsx";
import DateTimeFilter from "../components/DateTimeFilter.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { toast } from "sonner";
import axios from "axios";

const HomePage = () => {
  //state lưu danh sách nhiệm vụ từ backend
  const [taskBuffer, setTaskBuffer] = useState([]);

  useEffect(() => {
    fechTask();
  }, []);

  // goi api lay ds nv
  const fechTask = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tasks");

      setTaskBuffer(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  };

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
          <AddTask />
          {/* Thống kê và bộ lọc */}
          <StatsAndFilters />
          {/* Danh sách nhiệm vụ */}
          <TaskList filteredTasks={taskBuffer} />
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
