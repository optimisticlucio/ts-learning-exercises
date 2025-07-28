/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import CalculatorActions from "./CalculatorActions.jsx";
import CalculatorDigits from "./CalculatorDigits.jsx";
import CalculatorDisplay from "./CalculatorDisplay.jsx";

const MAX_DIGITS_ON_DISPLAY = 6;

function Calculator() {
  const [displayedDigits, setDisplayedDigits] = useState(0);
  const [lastResult, setLastResult] = useState(0);

  return (
    <div
      css={cssForWholeCalculator}
    >
      <CalculatorDisplay displayValue={displayedDigits} />

      <div
        css={cssForButtons}
      >
        <CalculatorDigits
          calculatorDisplay={displayedDigits}
          setCalculatorDisplay={setDisplayedDigits}
          pressable={displayedDigits.toString().length < MAX_DIGITS_ON_DISPLAY}
        />
        <CalculatorActions
          calculatorDisplay={displayedDigits}
          setCalculatorDisplay={setDisplayedDigits}
          lastResult={lastResult}
          setLastResult={setLastResult}
        />
      </div>
    </div>
  );
}

const cssForWholeCalculator = css`
        display: flex;
        flex-direction: column;
        max-width: 14em;
        width: fit-content;
        font-size: 2em;
      `;

const cssForButtons = css`
          display: flex;
          flex-direction: row;
          max-height: 7em;
        `;

export default Calculator;
