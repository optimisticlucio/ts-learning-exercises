/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { formatTimePassedInSeconds } from "../utils.js";
import { changeCurrentTask, pauseCurrentTask } from "../pure-redux/reducers.js";
import {store} from "../pure-redux/store.js";

export default function Task({
  name,
  secondsPassed,
  taskID,
  isActive = false,
}) {

  return (
    <div css={taskCss}>
      <div>{name}</div>
      <div>{formatTimePassedInSeconds(secondsPassed)}</div>
      <button
        onClick={
          isActive
            ? () => store.dispatch(pauseCurrentTask())
            : () => store.dispatch(changeCurrentTask(taskID))
        }
      >
        {isActive ? "Pause" : "Start"}
      </button>
    </div>
  );
}

const taskCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1ch;
`;
