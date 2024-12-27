"use client";

import {
  CirclePlay,
  RotateCcw,
  Pause,
  Settings,
  RefreshCcw,
} from "lucide-react";
import { Timer } from "@/components/timer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { formatTime } from "@/utils/format-time";
import SettingsModal from "@/components/settings-modal";
import useModalStore from "@/store/modal-store";
import useTimerStore from "@/store/timer-store";
import { getTimerColor } from "@/utils/get-time-color";
import { ModeButton } from "@/components/mode-button";
import { AlarmSound } from "@/components/alarm-sound";

export default function Page() {
  const {
    currentMode,
    startTimer,
    resetTimer,
    stopTimer,
    setRemainingTimer,
    setAuto,
    isRunning,
    remainingTime,
    maxValue,
    auto,
  } = useTimerStore();

  const { openModal } = useModalStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRunning && remainingTime > 0) {
        setRemainingTimer();
      } else if (remainingTime === 0) {
        stopTimer();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, remainingTime]);

  return (
    <>
      <AlarmSound />
      <div className="bg-[#1c1c1e] h-screen w-full flex items-center justify-center flex-col">
        <div className="flex flex-row">
          <ModeButton
            mode="work"
            label="Work Mode"
            activeColor="bg-green-600"
          />
          <ModeButton
            mode="shortBreak"
            label="Short Break"
            activeColor="bg-blue-600"
          />
          <ModeButton
            mode="longBreak"
            label="Long Break"
            activeColor="bg-purple-600"
          />
        </div>
        <div className="my-12">
          <Timer
            value={remainingTime}
            label={formatTime(remainingTime)}
            maxValue={maxValue}
            bgColor={getTimerColor(currentMode)}
          />
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={startTimer}
            label={isRunning ? "Pause" : "Start"}
            icon={isRunning ? Pause : CirclePlay}
            styles={isRunning ? "bg-orange-600" : "bg-green-600"}
          />
          <Button
            onClick={resetTimer}
            label="Reset"
            icon={RotateCcw}
            styles="bg-red-600"
          />
          <Button
            label="Auto"
            icon={RefreshCcw}
            styles={auto ? "bg-blue-800" : "bg-blue-600"}
            onClick={() => setAuto(!auto)}
          />
          <Button
            label="Settings"
            icon={Settings}
            styles="bg-gray-600"
            onClick={openModal}
          />
        </div>
      </div>
      <SettingsModal />
    </>
  );
}
