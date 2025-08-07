/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { formatTimePassedInSeconds } from "../utils.js";
import { observer } from "mobx-react-lite";

export const Task = observer(
  ({
    name,
    secondsPassed,
    taskID,
    isActive = false,
    pauseTaskFunction,
    changeTaskFunction,
  }) => {
    return (
      <div css={taskCss}>
        <div>{name}</div>
        <div>{formatTimePassedInSeconds(secondsPassed)}</div>
        <button
          onClick={
            isActive ? pauseTaskFunction : () => changeTaskFunction(taskID)
          }
        >
          {isActive ? "Pause" : "Start"}
        </button>
      </div>
    );
  },
);

const taskCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1ch;
`;
