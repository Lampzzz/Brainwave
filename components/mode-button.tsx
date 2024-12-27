import { Button } from "@/components/ui/button";
import useTimerStore, { Mode } from "@/store/timer-store";

interface ModeButtonProps {
  mode: Mode;
  label: string;
  activeColor: string;
}

export function ModeButton({ mode, label, activeColor }: ModeButtonProps) {
  const { changeMode, currentMode } = useTimerStore();

  return (
    <Button
      onClick={() => changeMode(mode)}
      label={label}
      styles={mode === currentMode ? activeColor : "bg-transparent"}
    />
  );
}
