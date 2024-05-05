import { useUnit } from "effector-react";
import Button from "./Button";
import {
  $counter,
  $maxValue,
  $startValue,
  counterIncremented,
  counterReseted,
  isSetuppingChanged,
} from "./store/counter-store";

export default function Counter() {
  const [counter, onIncrement, onReset] = useUnit([
    $counter,
    counterIncremented,
    counterReseted,
  ]);
  const [maxValue] = useUnit([$maxValue]);
  const [startValue] = useUnit([$startValue]);
  const [onSetupping] = useUnit([isSetuppingChanged]);

  const isCounterEqualsMaxValue = counter === maxValue;

  const handleChangeIsSetupping = () => onSetupping(true);
  const handleIncrementCount = () => onIncrement();
  const handleResetCount = () => onReset(startValue);

  return (
    <div className="counter">
      <div className="counter-table">
        <span className={isCounterEqualsMaxValue ? "error" : ""}>
          {counter}
        </span>
      </div>
      <div className="buttons">
        <Button
          disabled={isCounterEqualsMaxValue}
          onClick={handleIncrementCount}
        >
          inc
        </Button>
        <Button onClick={handleResetCount}>reset</Button>
        <Button onClick={handleChangeIsSetupping}>set</Button>
      </div>
    </div>
  );
}
