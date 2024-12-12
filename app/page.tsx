import React from "react";
import { Timer } from "@/components/timer";
import { Button } from "@/components/button";
import { CirclePlay, RotateCcw, Square } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-[#1c1c1e] h-screen w-full flex items-center justify-center flex-col">
      {/* <h1 className="text-4xl font-bold">Pomodoro</h1> */}
      <div className="my-12">
        <Timer />
      </div>
      <div className="flex space-x-4">
        <Button label="Start" icon={CirclePlay} bgColor="#4caf50" />
        <Button label="Reset" icon={RotateCcw} bgColor="#607d8b" />
        <Button label="Auto" icon={Square} bgColor="#f44336" />
        <Button label="Cycle" icon={Square} bgColor="#f44336" />
      </div>
    </div>
  );
}
