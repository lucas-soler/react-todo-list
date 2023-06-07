import { ChangeEvent, useState } from "react";
import { Task, TaskItem, TaskStateEnum } from "./components/TaskItem/TaskItem";

import { PlusCircle } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import clipboard from "./assets/clipboard.svg";
import { Header } from "./components/Header/Header";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTaskText, setNewTaskText] = useState<string>();

  const [createButtonDisabled, setCreateButtonDisabled] =
    useState<boolean>(true);

  const handleCompleteTask = (taskID: string, isChecked: boolean) => {
    const newTasks = tasks.map((task) =>
      task.id === taskID
        ? {
            ...task,
            state: isChecked ? TaskStateEnum.COMPLETED : TaskStateEnum.OPEN,
          }
        : task
    );

    setTasks(newTasks);
  };

  const handleDeleteTask = (taskID: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const newTasks = tasks.filter((task) => task.id !== taskID);

      setTasks(newTasks);
    }
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      text: newTaskText!,
      state: TaskStateEnum.OPEN,
    };

    const newTaskList = [...tasks, newTask];

    setTasks(newTaskList);
    setNewTaskText("");
    setCreateButtonDisabled(true);
  };

  const handleTaskTyping = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value.trim().length > 5
      ? setCreateButtonDisabled(false)
      : setCreateButtonDisabled(true);

    setNewTaskText(event.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              onChange={handleTaskTyping}
              value={newTaskText}
              placeholder="Type a new task with more than 5 characters"
              maxLength={100}
            />
            <button disabled={createButtonDisabled} onClick={handleAddTask}>
              <span>Create</span>
              <PlusCircle size={20} />
            </button>
          </div>
          <div className={styles.taskContainer}>
            <header>
              <div>
                <span className={styles.createdTasks}>Total tasks</span>
                <span className={styles.counter}>{tasks.length}</span>
              </div>
              <div>
                <span className={styles.completedTasks}>Completed</span>
                <span className={styles.counter}>
                  {
                    tasks.filter(
                      (task) => task.state === TaskStateEnum.COMPLETED
                    ).length
                  }
                </span>
              </div>
            </header>
            {tasks.length === 0 ? (
              <section className={styles.borderSection}>
                <div className={styles.taskListImage}>
                  <img src={clipboard} />
                </div>
                <div className={styles.taskListEmptyMessageContainer}>
                  <b>You have no tasks</b>
                  <span> Create and organize your personal to-do list</span>
                </div>
              </section>
            ) : (
              <section>
                {tasks.map((task) => {
                  return (
                    <TaskItem
                      task={task}
                      onComplete={handleCompleteTask}
                      onDelete={handleDeleteTask}
                      key={task.id}
                    />
                  );
                })}
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
