import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  const isActive = filter === "active";
  const isCompleted = filter === "complete" || filter === "completed";
  const isAll = !isActive && !isCompleted;

  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto text-muted-foreground" size={48} />
        <div>
          <h3 className="font-medium text-foreground">
            {isActive
              ? "未完了のタスクはありません"
              : isCompleted
              ? "完了したタスクはありません"
              : "タスクがありません"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isAll
              ? "最初のタスクを追加して始めましょう"
              : isActive
              ? "完了したタスクを表示するには「すべて」に切り替えてください"
              : "未完了のタスクを表示するには「すべて」に切り替えてください"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
