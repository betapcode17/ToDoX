import React, { useEffect, useState, useCallback } from "react";

import AddTask from "../components/AddTask.jsx";
import StatsAndFilters from "../components/StatsAndFilters.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskListPagination from "../components/TaskListPagination.jsx";
import DateTimeFilter from "../components/DateTimeFilter.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { toast } from "sonner";

import api from "@/lib/axios.js";
import { visibleTaskLimit } from "@/lib/data.js";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  // Gọi API lấy danh sách nhiệm vụ
  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      if (res?.data) {
        setTaskBuffer(res.data.tasks || []);
        setActiveTaskCount(res.data.activeCount || 0);
        setCompleteTaskCount(res.data.completeCount || 0);
      } else {
        toast.error("Không nhận được dữ liệu từ server");
      }
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  }, [dateQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Reset về trang 1 khi đổi bộ lọc
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Lọc nhiệm vụ theo trạng thái
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });

  // Tổng số trang
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit) || 1;

  // Nhiệm vụ hiển thị theo trang
  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  // Nếu trang hiện tại không còn nhiệm vụ (vd. xóa hết task trong trang đó)
  useEffect(() => {
    if (visibleTask.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [visibleTask, page]);

  // Hàm xử lý
  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
          `,
        }}
      />

      {/* Nội dung chính */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl m-6 mx-auto space-y-6">
          <Header />

          <AddTask handleNewTaskAdded={handleTaskChanged} />

          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCounts={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <TaskList
            filteredTasks={visibleTask}
            handleTaskChanged={handleTaskChanged}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
