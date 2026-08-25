import React, { useCallback, useEffect, useRef, useState } from "react"

interface TimerProps {
  seconds: number;
  onExpire?: () => void;
  children: (props: {remaining: number, isRunning: boolean, restart: () => void}) => React.ReactNode
} 

export function TimerContainer({
  seconds,
  onExpire,
  children
}: TimerProps) {
  const [endTime, setEndTime] = useState<number | null>(Date.now() + seconds * 1000);
  const [remaining, setRemaining] = useState(seconds);
  const onExpiredRef = useRef(onExpire);

  const calcRemaining = useCallback(() => {
    return endTime !== null 
      ? Math.max(0, Math.ceil((endTime - Date.now()) / 1000)) 
      : 0;
  }, [endTime]);

  useEffect(() => {
    if (endTime === null) {
      setRemaining(0);
      return;
    }

    setRemaining(calcRemaining());

    const intervalId = setInterval(() => {
      const value = calcRemaining();
      setRemaining(value);

      if (value <= 0) {
        clearInterval(intervalId);
        onExpiredRef.current?.();
      }
    }, 250);

    return () => clearInterval(intervalId);
  }, [endTime, calcRemaining, onExpire]);

  const restart = useCallback(() => {
    setEndTime(Date.now() + (seconds * 1000));
  }, [setEndTime, seconds]);

  const isRunning = endTime !== null && remaining > 0;

  return (
    <>
      {children({ remaining, isRunning, restart })}
    </>
  );
}