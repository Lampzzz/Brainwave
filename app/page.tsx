"use client";

import { Timer } from "@/components/timer";
import { Button } from "@/components/ui/button";
import {
  CirclePlay,
  RotateCcw,
  Pause,
  Settings,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { formatTime } from "@/utils/format-time";
import SettingsModal from "@/components/settings-modal";
import useModalStore from "@/store/modal-store";

type Work = "work" | "shortBreak" | "longBreak";

export default function Page() {
  const { openModal } = useModalStore();

  const alarmSound = useRef<HTMLAudioElement>(null);

  const WORK_TIME = 25 * 60;
  const SHORT_BREAK_TIME = 5 * 60;
  const LONG_BREAK_TIME = 10 * 60;

  const [currentMode, setCurrentMode] = useState<Work>("longBreak");
  const [cycle, setCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setRunning] = useState(false);
  const [isAuto, setAuto] = useState(false);
  const [maxValue, setMaxValue] = useState(WORK_TIME);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRunning && timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else if (timeLeft === 0) {
        handleStopTimer();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      alarmSound.current?.play();

      const soundEffect = setTimeout(() => {
        alarmSound.current?.pause();
        alarmSound.current!.currentTime = 0;
      }, 3000);

      return () => clearTimeout(soundEffect);
    }
  }, [timeLeft]);

  const toggleTimer = () => {
    setRunning((prev) => !prev);
  };

  const handleStopTimer = () => {
    setRunning(isAuto);

    switch (currentMode) {
      case "work":
        setCycle((prev) => prev + 1);

        if (cycle == 4) {
          setCurrentMode("longBreak");
          setTimeLeft(LONG_BREAK_TIME);
          setMaxValue(LONG_BREAK_TIME);
          setCycle(1);
        } else {
          setCurrentMode("shortBreak");
          setTimeLeft(SHORT_BREAK_TIME);
          setMaxValue(SHORT_BREAK_TIME);
        }
        break;

      case "longBreak":
      case "shortBreak":
        setCurrentMode("work");
        setTimeLeft(WORK_TIME);
        setMaxValue(WORK_TIME);
        break;
    }
  };

  const handleReset = () => {
    setRunning(isAuto);
    setTimeLeft(getSeconds(currentMode));
    setMaxValue(getSeconds(currentMode));
  };

  function getSeconds(mode: string) {
    switch (mode) {
      case "work":
        return WORK_TIME;
      case "shortBreak":
        return SHORT_BREAK_TIME;
      case "longBreak":
        return LONG_BREAK_TIME;
      default:
        return WORK_TIME;
    }
  }

  function getTimerColor(mode: string) {
    switch (mode) {
      case "work":
        return "#16a34a";
      case "shortBreak":
        return "#2563eb";
      case "longBreak":
        return "#9333ea ";
      default:
        return "#4CAF50";
    }
  }

  const changeTimerMode = (mode: Work) => {
    setRunning(isAuto);
    setCurrentMode(mode);
    setTimeLeft(getSeconds(mode));
    setMaxValue(getSeconds(mode));
  };

  return (
    <>
      <div className="bg-[#1c1c1e] h-screen w-full flex items-center justify-center flex-col">
        <audio src="/alarm-clock.mp3" ref={alarmSound} className="hidden" />
        {/* <p className="text-4xl font-bold">
        {currentMode === "work"
          ? "Work Time"
          : currentMode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </p> */}

        <div className="flex flex-row">
          <Button
            onClick={() => changeTimerMode("work")}
            label="Work Mode"
            styles={currentMode === "work" ? "bg-green-600" : "bg-transparent"}
          />
          <Button
            onClick={() => changeTimerMode("shortBreak")}
            label="Short Break"
            styles={
              currentMode === "shortBreak" ? "bg-blue-600" : "bg-transparent"
            }
          />
          <Button
            onClick={() => changeTimerMode("longBreak")}
            label="Long Break"
            styles={
              currentMode === "longBreak" ? "bg-purple-600" : "bg-transparent"
            }
          />
        </div>
        <div className="my-12">
          <Timer
            value={timeLeft}
            label={formatTime(timeLeft)}
            maxValue={maxValue}
            bgColor={getTimerColor(currentMode)}
          />
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={toggleTimer}
            label={isRunning ? "Pause" : "Start"}
            icon={isRunning ? Pause : CirclePlay}
            styles={isRunning ? "bg-orange-600" : "bg-green-600"}
          />
          <Button
            onClick={handleReset}
            label="Reset"
            icon={RotateCcw}
            styles="bg-red-600"
          />
          <Button
            label="Auto"
            icon={RefreshCcw}
            styles={isAuto ? "bg-blue-800" : "bg-blue-600"}
            onClick={() => setAuto((prev) => !prev)}
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
