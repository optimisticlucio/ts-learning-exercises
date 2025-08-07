/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NewTaskInput } from "./new-task-input.jsx";
import { Task } from "./task.jsx";
import { formatTimePassedInSeconds } from "../utils.js";
import TaskList from "../mobx/task-list.js";
import { observer } from "mobx-react-lite";

export const TimeTracker = observer(({ taskList }) => {
  return (
    <div css={generalCss}>
      <NewTaskInput addNewTaskFunction={taskList.addTask} />
      <div css={taskHolderCss}>
        {Object.values(taskList.tasks).map((task) => (
          <Task
            key={task.id}
            name={task.name}
            secondsPassed={task.secondsPassed}
            isActive={task.id === taskList.currentActiveTask}
            taskID={task.id}
            pauseTaskFunction={taskList.pauseCurrentTask}
            changeTaskFunction={taskList.changeCurrentTask}
          />
        ))}
      </div>
      <div>
        Total Time Passed:{" "}
        {formatTimePassedInSeconds(taskList.totalSecondsPassed)}
      </div>
    </div>
  );
});

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
