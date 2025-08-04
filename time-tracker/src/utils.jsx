export function formatTimePassedInSeconds(timePassedInSeconds) {
  const hours = Math.floor(timePassedInSeconds / 3600);
  const minutes = Math.floor((timePassedInSeconds % 3600) / 60);
  const seconds = timePassedInSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}
