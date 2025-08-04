import { formatTimePassedInSeconds } from "./utils.jsx";

export default function TotalTimeDisplay({ totalTimeInSeconds = 0 }) {
  return (
    <div>
      Total Time Passed: {formatTimePassedInSeconds(totalTimeInSeconds)}
    </div>
  );
}
