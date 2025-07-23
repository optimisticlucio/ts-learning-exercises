/** @jsxImportSource @emotion/react */
// import { useState } from "react";
import { css } from "@emotion/react";

const MAX_DIGITS_ON_DISPLAY = 6;

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
        border: 1px black solid;
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

export default CalculatorDigits;
