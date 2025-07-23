/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import CalculatorActions from "./CalculatorActions.jsx";
import CalculatorDigits from "./CalculatorDigits.jsx";

function App() {
  return Calculator();
}

function Calculator() {
  const [displayedDigits, setDisplayedDigits] = useState(0);
  const [lastCalculationResult, setLastCalculationResult] = useState(0);

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
      <CalculatorDisplay displayValue={displayedDigits} />

      <CalculatorButtons
        calculatorDisplay={displayedDigits}
        setCalculatorDisplay={setDisplayedDigits}
        lastResult={lastCalculationResult}
        setLastResult={setLastCalculationResult}
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
        border: 1px black solid;
        font-family: monospace;
        color: black;
        background-color: white;
      `}
    >
      {displayValue}
    </div>
  );
}

export default App;
