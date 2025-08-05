/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NewTaskInput from "./new-task-input.jsx";
import TotalTimeDisplay from "./total-time-display.jsx";
import Task from "./task.jsx";
import {useEffect, useState} from "react";
import { runOncePerSecond } from "../pure-redux/reducers.js";

export default function TimeTracker() {
  const [tasks, setTasks] = useState({});
  const [totalTime, setTotalTime] = useState(0)
  const [activeTaskID, setActiveTaskID] = useState(null);

    useEffect(() => {
        const id = setInterval(() => {
            window.store.dispatch(runOncePerSecond());
            //console.log(`Tick`); // For Debugging
        }, 1000);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        window.store.subscribe(() => {
            const { tasks, totalSecondsPassed, currentActiveTask } = window.store.getState();
            setTasks(tasks);
            setTotalTime(totalSecondsPassed);
            setActiveTaskID(currentActiveTask);
        })
    }, []);

  return (
    <div css={generalCss}>
      <NewTaskInput />
      <div css={taskHolderCss}>
        {Object.values(tasks).map((task) => (
          <Task
            name={task.name}
            secondsPassed={task.secondsPassed}
            isActive={task.id === activeTaskID}
            taskID={task.id}
            key={task.id}
          />
        ))}
      </div>
      <TotalTimeDisplay totalSecondsPassed={totalTime} />
    </div>
  );
}

const taskHolderCss = css`
  border-style: none solid;
  border-width: 0.25ch;
  border-color: black;
`;

const generalCss = css`
  background-color: blanchedalmond;
  padding: 1ch;
  color: darkgoldenrod;
`;
