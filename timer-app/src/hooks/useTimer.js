import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, start, stop, reset } from "../store/timerSlice";

export const useTimer = () => {
  const dispatch = useDispatch();
  const { time, isRunning } = useSelector(state => state.timer);
  const intervalRef = useRef(null);

  const startTimer = () => { if (!isRunning) dispatch(start()); };
  const stopTimer = () => dispatch(stop());
  const resetTimer = () => dispatch(reset());

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => dispatch(increment()), 1000);
    }
    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isRunning, dispatch]);

  return { timer: time, isRunning, startTimer, stopTimer, resetTimer };
};
