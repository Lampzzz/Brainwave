export function getTimerColor(mode: string) {
  switch (mode) {
    case "work":
      return "#16a34a";
    case "shortBreak":
      return "#2563eb";
    case "longBreak":
      return "#9333ea";
    default:
      return "#4CAF50";
  }
}
