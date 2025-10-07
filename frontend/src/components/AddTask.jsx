import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddTask = () => {
  return (
    <Card className="p-4 sm:p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          name="title"
          aria-label="タスクを追加"
          placeholder="今日は何をしますか？"
          className="w-full sm:flex-1 min-w-0 h-12 px-4 text-base bg-white/80 border border-border/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg shadow-sm placeholder:text-slate-400"
        />
        <Button
          type="submit"
          variant="gradient"
          size="xl"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          追加
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
