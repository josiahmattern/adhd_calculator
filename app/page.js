"use client";
import React, { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", points: "" });
  const [selectedTask, setSelectedTask] = useState("");

  const addTask = () => {
    if (newTask.name && newTask.points) {
      setTasks([
        ...tasks,
        { ...newTask, points: parseInt(newTask.points), id: Date.now() },
      ]);
      setNewTask({ name: "", points: "" });
    }
  };

  const addPreviousTask = () => {
    if (selectedTask) {
      const taskToAdd = tasks.find((task) => task.name === selectedTask);
      setTasks([...tasks, { ...taskToAdd, id: Date.now() }]);
      setSelectedTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);

  // Get unique task names for the dropdown
  const uniqueTasks = Array.from(new Set(tasks.map((task) => task.name)));

  return (
    <main className="flex p-4">
      <div className="w-1/3 pr-4">
        <div className="bg-zinc-300 p-3 text-xl rounded font-bold mb-4 max-w-xs">
          ADHD Calculator
        </div>
        <h2 className="text-md mb-2 p-3 text-white bg-zinc-700 rounded">
          Tasks you like get negative score, and tasks you don't get positive
          score. Try to keep your score at 0 or higher.
        </h2>
        <div className="flex flex-col max-w-xs mb-6">
          <h1 className="text-lg font-bold mb-2">Add new task</h1>
          <input
            placeholder="Task name"
            className="px-2 py-1 border border-black rounded mb-2 w-full"
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <input
            placeholder="Point Value"
            className="px-2 py-1 border border-black rounded mb-2 w-full"
            type="number"
            value={newTask.points}
            onChange={(e) => setNewTask({ ...newTask, points: e.target.value })}
          />
          <button
            className="bg-zinc-300 p-2 rounded w-full hover:bg-zinc-400 transition-colors"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col max-w-xs">
          <h1 className="text-lg font-bold mb-2">Add previous task</h1>
          <select
            className="px-2 py-1 border border-black rounded mb-2 w-full"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            <option value="">Select a task</option>
            {uniqueTasks.map((taskName, index) => (
              <option key={index} value={taskName}>
                {taskName}
              </option>
            ))}
          </select>
          <button
            className="bg-zinc-300 p-2 rounded w-full hover:bg-zinc-400 transition-colors"
            onClick={addPreviousTask}
          >
            Add Previous Task
          </button>
        </div>
      </div>

      <div className="w-2/3 border-l pl-4">
        <h2 className="text-xl font-bold mb-1 bg-zinc-300 p-3 rounded">
          Task List
        </h2>
        <div className="flex flex-col">
          <div className="flex justify-between py-2 border-b font-bold">
            <div className="w-2/3">Task name</div>
            <div className="w-1/3 text-right">Point Value</div>
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center py-2 border-b group"
            >
              <div className="w-2/3">{task.name}</div>
              <div className="w-1/3 flex justify-end items-center">
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 mr-2"
                  onClick={() => deleteTask(task.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span>{task.points}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-between py-2 border-b font-bold">
            <div className="w-2/3">Total Points</div>
            <div className="w-1/3 text-right">{totalPoints}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
