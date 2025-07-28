/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function CalculatorDisplay({ displayValue }) {
  return (
    <div
      css={displayCss}
    >
      {displayValue}
    </div>
  );
}

const displayCss = css`
        border: 1px black solid;
        font-family: monospace;
        color: black;
        background-color: white;
      `;
