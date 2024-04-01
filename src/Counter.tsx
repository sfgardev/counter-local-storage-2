import { useState } from "react";
import Button from "./Button";

type CounterProps = {
  maxValue: number;
  startValue: number;
  onSetupping: () => void;
};

export default function Counter({
  maxValue,
  startValue,
  onSetupping,
}: CounterProps) {
  const [count, setCount] = useState(startValue);

  const isCounterEqualsMaxValue = count === maxValue;

  const handleIncrementCount = () => {
    setCount((count) => count + 1);
  };

  const handleResetCount = () => {
    setCount(startValue);
  };

  return (
    <div className="counter">
      <div className="counter-table">
        <span className={isCounterEqualsMaxValue ? "error" : ""}>{count}</span>
      </div>
      <div className="buttons">
        <Button
          disabled={isCounterEqualsMaxValue}
          onClick={handleIncrementCount}
        >
          inc
        </Button>
        <Button onClick={handleResetCount}>reset</Button>
        <Button onClick={onSetupping}>set</Button>
      </div>
    </div>
  );
}
