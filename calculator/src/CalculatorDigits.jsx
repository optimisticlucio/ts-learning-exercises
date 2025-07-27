/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DigitButton from "./DigitButton.jsx";

function CalculatorDigits({
  calculatorDisplay,
  setCalculatorDisplay,
  pressable,
}) {
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
          pressable={pressable}
        />
      ))}
    </div>
  );
}

export default CalculatorDigits;
