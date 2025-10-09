import React from "react";
import { Filter } from "lucide-react"; // ❌ Không cần import Type
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCounts = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê */}
      <div className="flex gap-3 items-center">
        <Badge
          variant="secondary"
          className="bg-white text-accent-foreground border border-info-20"
        >
          {activeTasksCounts} {FilterType.active}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white text-success border border-success-20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Phần bộ lọc */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize flex items-center gap-2"
            onClick={() => setFilter(type)} // ✅ Dùng "type" thay vì "Type"
          >
            <Filter className="w-4 h-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
