"use client";

import useTimerStore from "@/store/timer-store";

export default function Title() {
  const { mode } = useTimerStore();

  return (
    <p className="text-4xl font-bold">
      {mode === "breakTime" ? "Break Time" : "Focus Mode"}
    </p>
  );
}
