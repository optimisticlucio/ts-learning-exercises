/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { formatTimePassedInSeconds } from "../utils.js";
import { useDispatch } from "react-redux";
import { changeCurrentTask, pauseCurrentTask } from "../redux-toolkit/reducers.js";

export default function Task({
  name,
  secondsPassed,
  taskID,
  isActive = false,
}) {
  const dispatch = useDispatch();

  return (
    <div css={taskCss}>
      <div>{name}</div>
      <div>{formatTimePassedInSeconds(secondsPassed)}</div>
      <button
        onClick={
          isActive
            ? () => dispatch(pauseCurrentTask())
            : () => dispatch(changeCurrentTask(taskID))
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
