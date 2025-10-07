import React from "react";

const Footer = ({ completedTasksCount = 2, activeTasksCount = 3 }) => {
  const totalTasks = completedTasksCount + activeTasksCount;

  return (
    <>
      {totalTasks > 0 && (
        <div className="text-center mt-4 animate-fade-in-up transition-all duration-500">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                すごいですね！{completedTasksCount} 件のタスクを完了しました🎉
                {activeTasksCount > 0 &&
                  `あと ${activeTasksCount} 件、もう少し頑張りましょう💪`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>さあ、${activeTasksCount} 件のタスクを始めましょう🔥</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
