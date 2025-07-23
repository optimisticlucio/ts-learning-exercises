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
        max-width: 10em;
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
    max-height: 7em`}>
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

  function add() {
    setActionAndClearDisplay("add");
  }

  function subtract() {
    setActionAndClearDisplay("subtract");
  }

  function multiply() {
    setActionAndClearDisplay("multiply");
  }

  function divide() {
    setActionAndClearDisplay("divide");
  }

  function setActionAndClearDisplay(action) {
    setActionChosen(action);
    setLastResult(calculatorDisplay)
    setCalculatorDisplay(0);
  }

  function clear() {
    setCalculatorDisplay(0);
  }

  function equality() {
    switch (actionChosen) {
      case "add":
        setCalculatorDisplay(lastResult + calculatorDisplay);
        break;

        case "divide":
          setCalculatorDisplay(lastResult / calculatorDisplay);
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
  }

  return (
    <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
        flex-wrap: wrap;
    flex-grow: 1`}>
      {[
        ["+", add], ["-", subtract],
          ["*", multiply],
          [":", divide],
        ["=", equality],
        ["AC", clear]
      ].map(([label, action]) => (
        <div
          onClick={action}
          css={css`
            background-color: sandybrown;
            color: cornflowerblue;
            border: 1px solid cornflowerblue;
            padding: 0.25em;
            text-align: center;
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
        flex-grow: 2;
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
      onClick={() => inputDigitToDisplay()} // TODO: This is not how this should work.
      css={css`
        border: black solid 1px;
        padding: 1ch;
        background: beige;
        color: chocolate;
        font-weight: bold;
      `}
    >
      {digit}
    </div>
  );
}

export default App;
