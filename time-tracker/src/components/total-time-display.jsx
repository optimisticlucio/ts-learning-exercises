import { formatTimePassedInSeconds } from "../utils.js";

export default function TotalTimeDisplay({ totalSecondsPassed = 0 }) {
  return (
    <div>
      Total Time Passed: {formatTimePassedInSeconds(totalSecondsPassed)}
    </div>
  );
}
