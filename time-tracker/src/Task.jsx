/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Task({ name, timePassedInSeconds, active = false}) {
    const properlyFormattedTime = new Date(timePassedInSeconds * 1000).toTimeString().split(" ")[0];

    return (
        <div css={taskCss}>
            <div>
                {name}
            </div>
            <div>
                {properlyFormattedTime}
            </div> // TODO: Give button functionality
            <button>{active ? "Pause" : "Start"}</button>
        </div>
    );
}

const taskCss = css`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`;
