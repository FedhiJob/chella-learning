import React from 'react';
import TaskList from '../component/TaskList';
export default function TasksPage() {
  return (
    <div className=" p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-montserrat mb-2">Daily Tasks</h1>
        <p className="text-gray-400">Complete tasks to earn rewards</p>
      </div>
    <TaskList />
    </div>
  );
}
