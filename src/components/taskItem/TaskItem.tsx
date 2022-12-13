import axios from "axios";
import styles from "./TaskItem.module.css";
import { tryApiRequestCatchError } from "../../utility/api";
import { TaskItemProps } from "../../types/Task.types";

export const TaskItem = ({
  id,
  title,
  getAllTasks,
}: TaskItemProps): JSX.Element => {
  const taskBody = {
    status: "closed",
    id,
  };

  const markTaskCompleted = async (): Promise<void | never> => {
    await tryApiRequestCatchError(getAllTasks, axios.put, 200, `/${id}`, {
      task: taskBody,
    });
  };

  const markTaskDeleted = async (): Promise<void | never> => {
    await tryApiRequestCatchError(getAllTasks, axios.delete, 204, `/${id}`);
  };

  return (
    <div className={styles["container"]}>
      <input className="checkbox-input" role="checkbox" aria-checked="false" />
      <span className={styles["checkmark"]} onClick={markTaskCompleted}></span>
      <label>{title}</label>
      <span
        className={`material-symbols-outlined ${styles["delete-icon"]}`}
        onClick={markTaskDeleted}>
        delete
      </span>
    </div>
  );
};
