import { useEffect, useRef } from "react";
import useTimerStore from "@/store/timer-store";

export default function AlarmSound() {
  const { remainingTime } = useTimerStore();
  const alarmSound = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (remainingTime === 0) {
      alarmSound.current?.play();

      const soundEffect = setTimeout(() => {
        alarmSound.current?.pause();
        alarmSound.current!.currentTime = 0;
      }, 3000);

      return () => clearTimeout(soundEffect);
    }
  }, [remainingTime]);

  return <audio src="/alarm-clock.mp3" ref={alarmSound} className="hidden" />;
}
