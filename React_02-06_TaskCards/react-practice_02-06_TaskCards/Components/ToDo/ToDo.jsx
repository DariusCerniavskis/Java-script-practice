import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";

const ToDo = () => {
    const [tasks, setTasks] = useState("");
    const [task, setTask] = useState([]);

    const onAddTask = () => {
        const newTask = {
            id: uuidv4(),
            title: task,
            isCompleted: false,
            creationDate: new Date(),
        };

        const newTasks = [...tasks, newTask];

        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));

        setTask("");
    };

    return (
        <>
            <div>
                <h1 style={{ textAlign: "center", paddingTop: "3rem" }}>
                    To do appliction
                </h1>
                <div className={styles["tasks-wrapper"]}>
                    <input
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value);
                        }}
                        placeholder="task"
                        type="text"
                    />
                    <button onClick={onAddTask}>Add</button>
                </div>
            </div>
        </>
    );
};

export default ToDo;
