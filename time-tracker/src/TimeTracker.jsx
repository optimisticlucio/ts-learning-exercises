/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TaskAdder from "./TaskAdder.jsx";
import TotalTimeDisplay from "./TotalTimeDisplay.jsx";
import Task from "./Task.jsx";
import { useSelector } from "react-redux";
import SecondCounter from "./SecondCounter.jsx";

export default function TimeTracker() {
  const tasks = useSelector((state) => state.tasks);
  const totalTime = useSelector((state) => state.totalTimePassedInSeconds);
  const activeTaskID = useSelector((state) => state.currentActiveTask);

  return (
    <div css={generalCss}>
      <SecondCounter />
      <TaskAdder />
      <div css={taskHolderCss}>
        {Object.values(tasks).map((task) => (
          <Task
            name={task.name}
            timePassedInSeconds={task.timePassedInSeconds}
            active={task.id === activeTaskID}
            taskID={task.id}
            key={task.id}
          />
        ))}
      </div>
      <TotalTimeDisplay totalTimeInSeconds={totalTime} />
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
