/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function DigitButton({ digit, addDigitToDisplay, pressable }) {
  return (
    <div
      onClick={pressable ? () => addDigitToDisplay(digit) : undefined}
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
