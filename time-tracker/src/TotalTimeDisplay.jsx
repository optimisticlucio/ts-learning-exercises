import { formatTimePassedInSeconds } from "./Utils.jsx";

export default function TotalTimeDisplay({ totalTimeInSeconds = 0 }) {
  return (
    <div>
      Total Time Passed: {formatTimePassedInSeconds(totalTimeInSeconds)}
    </div>
  );
}
