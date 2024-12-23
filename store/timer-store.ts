import { create } from "zustand";

type Mode = "work" | "breakTime";

interface TimerState {
  start: boolean;
  mode: Mode;
  workTime: number;
  shortbreakTime: number;
  longbreakTime: number;
  cycle: number;
  remainingTime: number;
  maxValue: number;
  getMinutes: (mode: string) => void;
  getMaxValue: (mode: string) => number;
  startTimer: () => void;
  setRemainingTimer: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  start: false,
  mode: "work",
  workTime: 1500,
  shortbreakTime: 300,
  longbreakTime: 600,
  cycle: 1,
  remainingTime: get().getMaxValue(get().mode),
  maxValue: 1500,

  getMinutes: (mode: string) => {
    if (mode === "work") {
      set({ remainingTime: get().workTime });
    } else if (mode === "breakTime") {
      if (get().cycle === 4) {
        set({ remainingTime: get().longbreakTime });
      } else {
        set({ remainingTime: get().longbreakTime });
      }
    } else {
      throw new Error("Invalid Mode");
    }
  },

  getMaxValue: (mode: string) => {
    if (mode === "work") {
      // set({ maxValue: get().workTime });
      return get().workTime;
    } else if (mode === "breakTime") {
      if (get().cycle === 4) {
        // set({ maxValue: get().longbreakTime });
        return get().longbreakTime;
      } else {
        // set({ maxValue: get().longbreakTime });
        return get().shortbreakTime;
      }
    } else {
      throw new Error("Invalid Mode");
    }
  },

  setRemainingTimer: () => {
    set({ remainingTime: get().remainingTime - 60 });
  },

  startTimer: () => {
    set({ start: !get().start });
  },

  breakTime: () => {
    set({ mode: "breakTime" });
  },
}));

export default useTimerStore;
