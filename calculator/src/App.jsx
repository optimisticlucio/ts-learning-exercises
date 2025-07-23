/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import "./App.css";

const MAX_DIGITS_ON_DISPLAY = 6;

function App() {
  return Calculator();
}

function Calculator() {
  // The current digits displayed on the calculator screen
  const [calculatorDisplay, setCalculatorDisplay] = useState(0);
  // The last result of any calculation.
  const [lastResult, setLastResult] = useState(0);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        max-width: 14em;
        width: fit-content;
        font-size: 2em;
      `}
    >
      <CalculatorDisplay displayValue={calculatorDisplay} />

      <CalculatorButtons
        calculatorDisplay={calculatorDisplay}
        setCalculatorDisplay={setCalculatorDisplay}
        lastResult={lastResult}
        setLastResult={setLastResult}
      />
    </div>
  );
}

function CalculatorButtons({
  calculatorDisplay,
  setCalculatorDisplay,
  lastResult,
  setLastResult,
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        max-height: 7em;
      `}
    >
      <CalculatorDigits
        calculatorDisplay={calculatorDisplay}
        setCalculatorDisplay={setCalculatorDisplay}
      />
      <CalculatorActions
        calculatorDisplay={calculatorDisplay}
        setCalculatorDisplay={setCalculatorDisplay}
        lastResult={lastResult}
        setLastResult={setLastResult}
      />
    </div>
  );
}

function CalculatorDisplay({ displayValue }) {
  return (
    <div
      css={css`
        border: black solid 1px;
        font-family: monospace;
        color: black;
        background-color: white;
      `}
    >
      {displayValue}
    </div>
  );
}

function CalculatorActions({
  calculatorDisplay,
  setCalculatorDisplay,
  lastResult,
  setLastResult,
}) {
  const [actionChosen, setActionChosen] = useState("none");

  function highlightCurrentButton(button) {
    for (let otherButton of button.parentElement.children) {
      otherButton.classList.remove("active");
    }

    button.classList.add("active");
  }

  function add(button) {
    setActionAndClearDisplay("add");
    highlightCurrentButton(button);
  }

  function subtract(button) {
    setActionAndClearDisplay("subtract");
    highlightCurrentButton(button);
  }

  function multiply(button) {
    setActionAndClearDisplay("multiply");
    highlightCurrentButton(button);
  }

  function divide(button) {
    setActionAndClearDisplay("divide");
    highlightCurrentButton(button);
  }

  function setActionAndClearDisplay(action) {
    setActionChosen(action);
    setLastResult(calculatorDisplay);
    setCalculatorDisplay(0);
  }

  function clear(button) {
    setCalculatorDisplay(0);
    setLastResult(0);

    for (let otherButton of button.parentElement.children) {
      otherButton.classList.remove("active");
    }
  }

  function equality(button) {
    switch (actionChosen) {
      case "add":
        setCalculatorDisplay(lastResult + calculatorDisplay);
        break;

      case "divide":
        if (calculatorDisplay === 0) {
          setCalculatorDisplay(0);
        } else {
          setCalculatorDisplay(Math.round(lastResult / calculatorDisplay));
        }
        break;

      case "subtract":
        setCalculatorDisplay(lastResult - calculatorDisplay);
        break;

      case "multiply":
        setCalculatorDisplay(lastResult * calculatorDisplay);
        break;

      case "none":
        // If there isn't an action selected the equality button doesn't do anything.
        break;
      default:
        console.warn(
          `actionChosen variable in calculator is set to "${actionChosen}", which is invalid.`,
        );
        break;
    }

    setLastResult(calculatorDisplay);
    for (let otherButton of button.parentElement.children) {
      otherButton.classList.remove("active");
    }
  }

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
          onClick={(event) => {
            action(event.currentTarget);
          }}
          css={css`
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
          `}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function CalculatorDigits({ calculatorDisplay, setCalculatorDisplay }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      `}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
        <DigitButton
          digit={digit}
          setCalculatorDisplay={setCalculatorDisplay}
          calculatorDisplay={calculatorDisplay}
        />
      ))}
    </div>
  );
}

function DigitButton({ digit, calculatorDisplay, setCalculatorDisplay }) {
  function inputDigitToDisplay() {
    if (calculatorDisplay.toString().length >= MAX_DIGITS_ON_DISPLAY) return;

    setCalculatorDisplay(calculatorDisplay * 10 + digit);
  }

  return (
    <div
      onClick={() => inputDigitToDisplay()}
      css={css`
        border: black solid 1px;
        padding: 1ch;
        background: beige;
        color: chocolate;
        font-weight: bold;
        &:hover {
          filter: brightness(0.7);
        }
      `}
    >
      {digit}
    </div>
  );
}

export default App;
