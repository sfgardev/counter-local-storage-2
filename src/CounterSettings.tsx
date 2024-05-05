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
import Input from "./Input";

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
        <Input
          label="max value:"
          className={!isMaxValueValid || !isMaxGreaterStart ? "error" : ""}
          type="number"
          value={maxValue}
          name="maxValue"
          onChange={(event) =>
            onChangeMaxValue(Number(event.currentTarget.value))
          }
        />

        <Input
          label="start value:"
          className={!isStartValueValid || !isMaxGreaterStart ? "error" : ""}
          type="number"
          value={startValue}
          name="startValue"
          onChange={(event) =>
            onChangeStartValue(Number(event.currentTarget.value))
          }
        />
      </div>
      <div className="buttons">
        <Button disabled={isError} onClick={handleChangeIsSetupping}>
          set
        </Button>
      </div>
    </div>
  );
}
