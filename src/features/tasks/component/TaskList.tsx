"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Circle, Zap } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getTodaysTask,
  completeTask,
  getCompletedTasks,
} from "../slice/taskSlice";
import type { RootState } from "../../../store/store";

export default function TaskList() {
  const dispatch = useAppDispatch();

  const { loading, tasks, error, completedTasks } = useAppSelector(
    (state: RootState) => state.task
  );

  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [completionAnimation, setCompletionAnimation] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(getTodaysTask());
    dispatch(getCompletedTasks());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  const handleCompleteTask = (id: number) => {
    setCompletionAnimation(id);
    dispatch(completeTask(id));
    setTimeout(() => setCompletionAnimation(null), 300);
  };

 
  const isTaskCompleted = (task: any) =>
    completedTasks.some(
      (completed) => completed.title === task.title
    );


  const filteredTasks = tasks.filter((task) => {
    const completed = isTaskCompleted(task);

    if (filter === "completed") return completed;
    if (filter === "pending") return !completed;
    return true;
  });

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Total Tasks</p>
          <p className="text-2xl font-bold text-[#FFD700]">
            {tasks.length}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-400">
            {completedTasks.length}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {tasks.length - completedTasks.length}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Earned Today</p>
          <p className="text-2xl font-bold text-[#FFD700]">
            {completedTasks.reduce(
              (sum, task) => sum + task.rewardAmount,
              0
            )}{" "}
            ETB
          </p>
        </div>
      </div>

     
      <div className="flex gap-3 mb-6">
        {["all", "completed", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-4 py-2 rounded-lg text-sm capitalize ${
              filter === type
                ? "bg-[#FFD700] text-black"
                : "bg-[#1A1A1A] border border-gray-800 text-gray-400"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

    
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const completed = isTaskCompleted(task);

          return (
            <div
              key={task.id}
              className={`bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 transition-all ${
                completionAnimation === Number(task.id)
                  ? "scale-95 opacity-50"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                
                  <div className="mt-1">
                    {completed ? (
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <CheckCircle2
                          className="text-green-400"
                          size={24}
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-800 p-2 rounded-full">
                        <Circle
                          className="text-gray-500"
                          size={24}
                        />
                      </div>
                    )}
                  </div>

               
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">
                        {task.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-[#2A2A2A] text-gray-400 rounded">
                        {task.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Complete this task to earn rewards
                    </p>
                  </div>
                </div>

              
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-3">
                    <Zap className="text-[#FFD700]" size={18} />
                    <span className="text-2xl font-bold text-[#FFD700]">
                      {task.rewardAmount}
                    </span>
                    <span className="text-gray-400">ETB</span>
                  </div>

                  {!completed ? (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="btn-gold text-sm py-2 px-4"
                    >
                      Complete Task
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-green-900/20 text-green-400 text-sm py-2 px-4 rounded-lg border border-green-700"
                    >
                      Completed
                    </button>
                  )}
                </div>
              </div>

            
              <div className="mt-4 bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    completed
                      ? "bg-green-500 w-full"
                      : "bg-[#FFD700] w-1/3"
                  }`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
