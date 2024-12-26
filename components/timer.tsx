import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerProps {
  value: number;
  label: string;
  maxValue: number;
  bgColor: string;
}

export function Timer({
  value,
  label,
  maxValue,
  bgColor = "#4CAF50 ",
}: TimerProps) {
  return (
    <div className="w-[300px] h-[300px]">
      <CircularProgressbarWithChildren
        value={value}
        minValue={0}
        maxValue={maxValue}
        styles={{
          root: {},
          path: {
            stroke: bgColor,
            strokeLinecap: "butt",
          },
          trail: {
            strokeLinecap: "round",
          },
        }}
      >
        <p className="text-6xl font-bold">{label}</p>
      </CircularProgressbarWithChildren>
    </div>
  );
}
