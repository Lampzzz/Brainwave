"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import Modal from "./ui/modal";
import NumberField from "./form/number-field";
import useModalStore from "@/store/modal-store";
import useTimerStore from "@/store/timer-store";
import React, { useState } from "react";

export default function SettingsModal() {
  const { closeModal } = useModalStore();
  const { times, setTime, setLongBreakInterval } = useTimerStore();

  const [time, setTimeState] = useState({
    workTime: times.work / 60,
    shortBreakTime: times.shortBreak / 60,
    longBreakTime: times.longBreak / 60,
    longBreakInterval: 4,
  });

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeState({ ...time, [e.target.name]: Number(e.target.value) });
  };

  const updateTime = () => {
    closeModal();
    setTime("work", time.workTime * 60);
    setTime("shortBreak", time.shortBreakTime * 60);
    setTime("longBreak", time.longBreakTime * 60);
    setLongBreakInterval(time.longBreakInterval);
  };

  return (
    <Modal>
      <div className="w-[400px] rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">Settings</p>
          <button onClick={closeModal}>
            <X size={24} />
          </button>
        </div>

        <div className="py-8">
          <p className="font-medium mb-6">Time (minutes)</p>
          <div className="flex justify-between space-x-4 mb-6">
            <NumberField
              label="Pomodoro"
              value={time.workTime}
              onChangeTime={onChangeTime}
              name="workTime"
            />
            <NumberField
              label="Short Break"
              value={time.shortBreakTime}
              onChangeTime={onChangeTime}
              name="shortBreakTime"
            />
            <NumberField
              name="longBreakTime"
              label="Long Break"
              value={time.longBreakTime}
              onChangeTime={onChangeTime}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Long Break Interval</p>
            <NumberField
              name="longBreakInterval"
              isLabel={false}
              value={time.longBreakInterval}
              onChangeTime={onChangeTime}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button label="Okay" styles="bg-black" onClick={updateTime} />
        </div>
      </div>
    </Modal>
  );
}
