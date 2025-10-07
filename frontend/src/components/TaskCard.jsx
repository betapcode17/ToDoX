import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";

const TaskCard = ({ task, index }) => {
  const isComplete = task?.status === "complete";
  const isEditing = false;

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        isComplete && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* 完了ボタン */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 rounded-full transition-all duration-200",
            isComplete
              ? "text-success hover:text-success-80"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {isComplete ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="何をしなければならないか？"
              className="flex-1 h-12 text-base border-border-50 focus:border-primary-50 focus:ring-primary-20"
              type="text"
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                isComplete
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          {/* 作成日 & 完了日 */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              作成日: {new Date(task.createdAt).toLocaleString("ja-JP")}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  完了日: {new Date(task.completedAt).toLocaleString("ja-JP")}
                </span>
              </>
            )}
          </div>
        </div>
        {/* 編集ボタン & 削除ボタン */}
        <div className="hidden gap-2 mt-2 group-hover:flex animate-slide-up">
          {/* 編集ボタン */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
          >
            <SquarePen className="size-4" />
          </Button>

          {/* 削除ボタン */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        {/* タスクタイトル */}
      </div>
    </Card>
  );
};

export default TaskCard;
