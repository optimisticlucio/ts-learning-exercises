
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import TaskAdder from "./TaskAdder.jsx";
import TotalTimeDisplay from "./TotalTimeDisplay.jsx";
import Task from "./Task.jsx";

const testTasks = {
    1: {
        id: 1,
        name: "Some Task",
        timePassedInSeconds: 4
    },
    3: {
        id: 3,
        name: "Another Task",
        timePassedInSeconds: 62
    }
};

export default function TimeTracker() {

    const tasks = testTasks; // TODO: Connect with the actual tasks.

  return (
    <>
      <TaskAdder />
        <div css={taskHolderCss}>
            {tasks.map((task) => (
                <Task name={task.name} timePassedInSeconds={task.timePassedInSeconds} active={false}/>
            ))}
        </div>
      <TotalTimeDisplay />
    </>
  )
}

const taskHolderCss = css`
    border-style: none solid;
    border-width: .25ch;
    border-color: black;
`;
