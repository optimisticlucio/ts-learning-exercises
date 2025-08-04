/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import CalculatorActionButtons from "./CalculatorActionButtons.jsx";
import CalculatorDigits from "./CalculatorDigits.jsx";
import { ACTIONS } from "./CalculatorActions.jsx";

const MAX_DIGITS_ON_DISPLAY = 6;

function Calculator() {
  const [displayedDigits, setDisplayedDigits] = useState(0);
  const [lastResult, setLastResult] = useState(0);
  const [actionChosen, setActionChosen] = useState(ACTIONS.NONE);

  function addDigitToDisplay(digit) {
    setDisplayedDigits(displayedDigits * 10 + digit);
  }

  useEffect(() => {
    switch (actionChosen) {
      case ACTIONS.NONE:
        break;
      case ACTIONS.AC:
        setDisplayedDigits(0);
        setLastResult(0);
        setActionChosen(ACTIONS.NONE);
        break;
      default:
        setLastResult(displayedDigits);
        setDisplayedDigits(0);
        break;
    }
  }, [actionChosen]);

  function runEquality() {
    switch (actionChosen) {
      case ACTIONS.ADD:
        setDisplayedDigits(lastResult + displayedDigits);
        break;

      case ACTIONS.DIVIDE:
        if (displayedDigits === 0) {
          setDisplayedDigits(0);
        } else {
          setDisplayedDigits(Math.round(lastResult / displayedDigits));
        }
        break;

      case ACTIONS.SUBTRACT:
        setDisplayedDigits(lastResult - displayedDigits);
        break;

      case ACTIONS.MULTIPLY:
        setDisplayedDigits(lastResult * displayedDigits);
        break;

      case ACTIONS.NONE:
        // If there isn't an action selected the equality button doesn't do anything.
        break;
      default:
        console.warn(
          `actionChosen variable in calculator is set to "${actionChosen}", which is invalid.`,
        );
        break;
    }

    setLastResult(displayedDigits);
    setActionChosen(ACTIONS.NONE);
  }

  return (
    <div css={cssForWholeCalculator}>
      <div css={displayCss}>{displayedDigits}</div>

      <div css={cssForButtons}>
        <CalculatorDigits
          addDigitToDisplay={addDigitToDisplay}
          pressable={displayedDigits.toString().length < MAX_DIGITS_ON_DISPLAY}
        />
        <CalculatorActionButtons
          actionChosen={actionChosen}
          setActionChosen={setActionChosen}
          runEquality={runEquality}
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

const displayCss = css`
  border: 1px black solid;
  font-family: monospace;
  color: black;
  background-color: white;
`;

export default Calculator;
