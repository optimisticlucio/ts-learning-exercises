/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function DigitButton({
  digit,
  calculatorDisplay,
  setCalculatorDisplay,
  pressable,
}) {
  function inputDigitToDisplay() {
    setCalculatorDisplay(calculatorDisplay * 10 + digit);
  }

  return (
    <div
      onClick={pressable ? inputDigitToDisplay : undefined}
      css={digitCss}
    >
      {digit}
    </div>
  );
}

const digitCss = css`
        border: 1px black solid;
        padding: 1ch;
        background: beige;
        color: chocolate;
        font-weight: bold;
        &:hover {
          filter: brightness(0.7);
        }
      `;