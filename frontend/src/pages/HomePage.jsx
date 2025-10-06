import React from "react";

import AddTask from "../components/AddTask.jsx";
import StatsAndFilters from "../components/StatsAndFilters.jsx";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination.jsx";
import DateTimeFilter from "../components/DateTimeFilter.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const HomePage = () => {
  return (
    <>
      <div className="container pt-8 mx-auto">
        <div className="w-full max-w-2xl m-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />
          {/* Tạo nhiệm vụ */}
          <AddTask />
          {/* Thống kê và bộ lọc */}
          <StatsAndFilters />
          {/* Danh sách nhiệm vụ */}
          <TaskList />
          {/* Phân trang và lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          {/* Chân trang */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
