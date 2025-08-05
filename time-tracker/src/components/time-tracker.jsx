/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NewTaskInput from "./new-task-input.jsx";
import TotalTimeDisplay from "./total-time-display.jsx";
import Task from "./task.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { runOncePerSecond } from "../redux/reducers.jsx";

export default function TimeTracker() {
  const tasks = useSelector((state) => state.tasks);
  const totalTime = useSelector((state) => state.totalSecondsPassed);
  const activeTaskID = useSelector((state) => state.currentActiveTask);
  const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(runOncePerSecond());
            //console.log(`Tick`); // For Debugging
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch]);

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
