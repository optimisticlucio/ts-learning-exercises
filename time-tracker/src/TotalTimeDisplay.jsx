

export default function TotalTimeDisplay({ totalTimePassedInSeconds }) {
    const properlyFormattedTime = new Date(totalTimePassedInSeconds * 1000).toTimeString().split(" ")[0];

    return (
        <div>
            Total Time Passed: { properlyFormattedTime }
        </div>
    );
}