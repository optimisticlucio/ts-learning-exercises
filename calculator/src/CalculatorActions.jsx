/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

const ACTIONS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  NONE: "NONE",
};

function CalculatorActions({
  calculatorDisplay,
  setCalculatorDisplay,
  lastResult,
  setLastResult,
}) {
  const [actionChosen, setActionChosen] = useState(ACTIONS.NONE);
  const [highlightedButton, setHighlightedButton] = useState("none");

  function add(buttonKey) {
    setActionAndClearDisplay(ACTIONS.ADD);
    setHighlightedButton(buttonKey);
  }

  function subtract(buttonKey) {
    setActionAndClearDisplay(ACTIONS.SUBTRACT);
    setHighlightedButton(buttonKey);
  }

  function multiply(buttonKey) {
    setActionAndClearDisplay(ACTIONS.MULTIPLY);
    setHighlightedButton(buttonKey);
  }

  function divide(buttonKey) {
    setActionAndClearDisplay(ACTIONS.DIVIDE);
    setHighlightedButton(buttonKey);
  }

  function setActionAndClearDisplay(action) {
    setActionChosen(action);
    setLastResult(calculatorDisplay);
    setCalculatorDisplay(0);
  }

  function clear() {
    setCalculatorDisplay(0);
    setLastResult(0);

    setHighlightedButton("none");
  }

  function equality() {
    switch (actionChosen) {
      case ACTIONS.ADD:
        setCalculatorDisplay(lastResult + calculatorDisplay);
        break;

      case ACTIONS.DIVIDE:
        if (calculatorDisplay === 0) {
          setCalculatorDisplay(0);
        } else {
          setCalculatorDisplay(Math.round(lastResult / calculatorDisplay));
        }
        break;

      case ACTIONS.SUBTRACT:
        setCalculatorDisplay(lastResult - calculatorDisplay);
        break;

      case ACTIONS.MULTIPLY:
        setCalculatorDisplay(lastResult * calculatorDisplay);
        break;

      case ACTIONS.NONE:
        // If there isn't an action selected the equality button doesn't do anything.
        break;
      default:
        console.warn(
          `actionChosen variable in calculator is set to "${actionChosen}", which is invalid.`,
        );
        break;
    }

    setLastResult(calculatorDisplay);
    setHighlightedButton("none");
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

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
      `}
    >
      {[
        ["+", add],
        ["-", subtract],
        ["*", multiply],
        [":", divide],
        ["=", equality],
        ["AC", clear],
      ].map(([label, action]) => (
        <div
          onClick={() => {
            action(label);
          }}
          key={label}
          className={`${label === highlightedButton ? "active" : ""}`}
          css={buttonCss}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default CalculatorActions;
