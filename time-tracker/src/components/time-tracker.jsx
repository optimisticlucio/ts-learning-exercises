/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NewTaskInput from "./new-task-input.jsx";
import Task from "./task.jsx";
import { useEffect, useState } from "react";
import { runOncePerSecond } from "../pure-redux/reducers.js";
import { store } from "../pure-redux/store.js";
import { formatTimePassedInSeconds } from "../utils.js";

export default function TimeTracker() {
  const [tasks, setTasks] = useState({});
  const [totalTime, setTotalTime] = useState(0);
  const [activeTaskID, setActiveTaskID] = useState(null);

  useEffect(() => {
    store.subscribe(() => {
      const { tasks, totalSecondsPassed, currentActiveTask } = store.getState();
      setTasks(tasks);
      setTotalTime(totalSecondsPassed);
      setActiveTaskID(currentActiveTask);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      store.dispatch(runOncePerSecond());
      console.log(`Tick, ${JSON.stringify(store.getState())}`); // For Debugging
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div css={generalCss}>
      <NewTaskInput />
      <div css={taskHolderCss}>
        {Object.values(tasks).map((task) => (
          <Task
            key={task.id}
            name={task.name}
            secondsPassed={task.secondsPassed}
            isActive={task.id === activeTaskID}
            taskID={task.id}
          />
        ))}
      </div>
      <div>Total Time Passed: {formatTimePassedInSeconds(totalTime)}</div>
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
