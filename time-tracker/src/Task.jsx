/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { formatTimePassedInSeconds } from "./Utils.jsx"
import { useDispatch } from 'react-redux';
import {changeCurrentTask, pauseAllTasks} from './reducers.jsx';

export default function Task({ name, timePassedInSeconds, taskID, active = false}) {
    const dispatch = useDispatch();

    return (
        <div css={taskCss}>
            <div>
                {name}
            </div>
            <div>
                {formatTimePassedInSeconds(timePassedInSeconds)}
            </div>
            <button
                onClick={ active ?
                    () => dispatch(pauseAllTasks())
                    :
                    () => dispatch(changeCurrentTask(taskID))
            }
            >{active ? "Pause" : "Start"}</button>
        </div>
    );
}

const taskCss = css`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1ch;
`;
