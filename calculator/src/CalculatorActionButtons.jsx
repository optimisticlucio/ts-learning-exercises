/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ACTIONS } from "./CalculatorActions.jsx";

export default function CalculatorActionButtons({
  setActionChosen,
  runEquality,
  actionChosen,
}) {
  return (
    <div css={buttonHolderCss}>
      {[
        ["+", ACTIONS.ADD],
        ["-", ACTIONS.SUBTRACT],
        ["*", ACTIONS.MULTIPLY],
        [":", ACTIONS.DIVIDE],
        ["AC", ACTIONS.AC],
      ].map(([label, action]) => (
        <div
          onClick={() => {
            setActionChosen(action);
          }}
          key={label}
          className={`${action === actionChosen ? "active" : ""}`}
          css={buttonCss}
        >
          {label}
        </div>
      ))}
      <div onClick={runEquality} css={buttonCss}>
        =
      </div>
    </div>
  );
}

const buttonCss = css`
  background-color: sandybrown;
  color: cornflowerblue;
  border: 1px solid cornflowerblue;
  padding: 0.25em;
  text-align: center;

  &:hover {
    filter: contrast(1.5);
  }

  &.active {
    background-color: cornflowerblue;
    color: tomato;
    border-color: tomato;
  }
`;

const buttonHolderCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;
