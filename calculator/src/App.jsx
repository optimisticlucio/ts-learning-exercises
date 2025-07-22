/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import "./App.css";

function App() {
  return Calculator();
}

function Calculator() {
  // The current digits displayed on the calculator screen
  const [calculatorDisplay, setCalculatorDisplay] = useState(0);
  // The last result of any calculation.
  //const [lastResult, setLastResult] = useState(0);

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
      <CalculatorDigits setCalculatorDisplay={setCalculatorDisplay} />
    </div>
  );
}

function CalculatorDisplay({ displayValue }) {
  return (
    <div
      css={css`
        border: black solid 1px;
      `}
    >
      {displayValue}
    </div>
  );
}

function CalculatorDigits({ setCalculatorDisplay }) {
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
        />
      ))}
    </div>
  );
}

function DigitButton({ digit, setCalculatorDisplay }) {
  return (
    <div
      onClick={() => setCalculatorDisplay(digit)} // TODO: This is not how this should work.
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
