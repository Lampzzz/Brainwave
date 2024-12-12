"use client";

import { useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function Timer() {
  const [percentage, setPercentage] = useState(70);

  return (
    <div className="w-[300px] h-[300px]">
      <CircularProgressbarWithChildren
        value={percentage}
        styles={{
          root: {},
          path: {
            stroke: "rgb(76, 175, 80)",
          },
          trail: {
            strokeLinecap: "round",
          },
        }}
      >
        <p className="text-5xl font-bold">00:25:00</p>
      </CircularProgressbarWithChildren>
    </div>
  );
}
