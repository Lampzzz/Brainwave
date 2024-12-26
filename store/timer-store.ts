import { create } from "zustand";

type Mode = "work" | "shortBreak" | "longBreak";

interface Times {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface TimerState {
  isRunning: boolean;
  auto: boolean;
  currentMode: Mode;
  times: Times;
  longBreakInterval: number;
  remainingTime: number;
  maxValue: number;
  changeMode: (mode: Mode) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setRemainingTimer: () => void;
  setRunning: (newValue: boolean) => void;
  setAuto: (newValue: boolean) => void;
  setLongBreakInterval: (newValue: number) => void;
  setTime: (mode: Mode, newValue: number) => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  auto: false,
  currentMode: "work",
  times: {
    work: 1500,
    shortBreak: 300,
    longBreak: 600,
  },
  longBreakInterval: 4,
  remainingTime: 1500,
  maxValue: 1500,

  setRemainingTimer: () => {
    set((state) => ({ remainingTime: state.remainingTime - 1 }));
  },

  startTimer: () => {
    set({ isRunning: !get().isRunning });
  },

  stopTimer: () => {
    const { currentMode, longBreakInterval, times, auto } = get();
    set({ isRunning: auto });

    if (currentMode === "work") {
      const newInterval = longBreakInterval - 1;

      if (newInterval <= 0) {
        set({
          currentMode: "longBreak",
          remainingTime: times.longBreak,
          maxValue: times.longBreak,
          longBreakInterval: 4,
        });
      } else {
        set({
          currentMode: "shortBreak",
          remainingTime: times.shortBreak,
          maxValue: times.shortBreak,
          longBreakInterval: newInterval,
        });
      }
    } else {
      set({
        currentMode: "work",
        remainingTime: times.work,
        maxValue: times.work,
      });
    }
  },

  resetTimer: () => {
    const { times, currentMode, auto } = get();
    set({
      remainingTime: times[currentMode],
      isRunning: auto,
      maxValue: times[currentMode],
    });
  },

  changeMode: (mode: Mode) => {
    set({
      currentMode: mode,
      isRunning: get().auto,
      remainingTime: get().times[mode],
      maxValue: get().times[mode],
    });
  },

  setRunning: (newValue: boolean) => {
    set({ isRunning: newValue });
  },

  setAuto: (newValue: boolean) => {
    set({ auto: newValue });
  },

  setTime: (mode: Mode, newValue: number) => {
    set((state) => ({
      times: { ...state.times, [mode]: newValue },
      remainingTime: state.times[state.currentMode],
      maxValue: state.times[state.currentMode],
    }));
  },

  setLongBreakInterval: (newValue: number) =>
    set({ longBreakInterval: newValue }),
}));

export default useTimerStore;
