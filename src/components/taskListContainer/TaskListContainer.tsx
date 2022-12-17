import { useState, useEffect, ReactElement } from "react";
import { Task } from "../../types/Task.types";
import { getTasks } from "../../utility/api";
import { NewTaskInputForm } from "../newTaskInputForm/NewTaskInputForm";
import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskListContainer.module.css";

export const TaskListContainer = (): ReactElement => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskItems = Array.from(tasks);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const taskList = taskItems?.map(
    (task) =>
      task.status === "open" && (
        <TaskItem {...task} key={task.id} setTasks={setTasks} />
      )
  );

  return (
    <div id={styles["task-list-container"]} className="flex-column-center">
      <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
      <NewTaskInputForm setTasks={setTasks} />
      <div id={styles["task-list"]} className="flex-column-center">
        {taskList}
      </div>
    </div>
  );
};
