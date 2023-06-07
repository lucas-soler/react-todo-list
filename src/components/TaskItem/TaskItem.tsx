import { Trash } from "@phosphor-icons/react";
import { ChangeEvent } from "react";
import styles from "./TaskItem.module.css";

export interface Task {
  id: string;
  text: string;
  state: TaskStateEnum;
}

export enum TaskStateEnum {
  OPEN = "OPEN",
  COMPLETED = "COMPLETED",
}

interface TaskProps {
  task: Task;
  onComplete(taskID: string, isChecked: boolean): void;
  onDelete(taskID: string): void;
}

export function TaskItem({ task, onComplete, onDelete }: TaskProps) {
  const handleCompleteTask = (event: ChangeEvent<HTMLInputElement>) => {
    const checkBoxIsChecked = event.target.checked;

    onComplete(task.id, checkBoxIsChecked);
  };

  const handleDeleteTask = () => {
    onDelete(task.id);
  };

  return (
    <article>
      <div className={styles.checkBoxContainer}>
        <input id={task.id} type="checkbox" onChange={handleCompleteTask} />
      </div>
      <span
        className={
          task.state === TaskStateEnum.COMPLETED ? styles.lineThrough : ""
        }
      >
        {task.text}
      </span>
      <Trash size={20} opacity={0.8} onClick={handleDeleteTask} />
    </article>
  );
}
