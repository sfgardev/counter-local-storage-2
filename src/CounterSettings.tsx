import { useUnit } from "effector-react";
import Button from "./Button";
import {
  $isError,
  $isMaxGreaterStart,
  $isMaxValueValid,
  $isStartValueValid,
  $maxValue,
  $startValue,
  counterReseted,
  isSetuppingChanged,
  maxValueChanged,
  startValueChanged,
} from "./store/counter-store";

export default function CounterSettings() {
  const [startValue, onChangeStartValue] = useUnit([
    $startValue,
    startValueChanged,
  ]);
  const [maxValue, onChangeMaxValue] = useUnit([$maxValue, maxValueChanged]);
  const [onSetupping] = useUnit([isSetuppingChanged]);
  const [onReset] = useUnit([counterReseted]);
  const [isMaxGreaterStart, isMaxValueValid, isStartValueValid, isError] =
    useUnit([
      $isMaxGreaterStart,
      $isMaxValueValid,
      $isStartValueValid,
      $isError,
    ]);

  const handleChangeIsSetupping = () => {
    onReset(startValue);
    onSetupping(false);
  };

  return (
    <div className="counter">
      <div className="counter-table">
        <label>
          max value:
          <input
            className={!isMaxValueValid || !isMaxGreaterStart ? "error" : ""}
            type="number"
            value={maxValue}
            name="maxValue"
            onChange={(event) =>
              onChangeMaxValue(Number(event.currentTarget.value))
            }
          />
        </label>
        <label>
          start value:
          <input
            className={!isStartValueValid || !isMaxGreaterStart ? "error" : ""}
            type="number"
            value={startValue}
            name="startValue"
            onChange={(event) =>
              onChangeStartValue(Number(event.currentTarget.value))
            }
          />
        </label>
      </div>
      <div className="buttons">
        <Button disabled={isError} onClick={handleChangeIsSetupping}>
          set
        </Button>
      </div>
    </div>
  );
}
