import { ChangeEvent } from "react";
import Button from "./Button";

type CounterSettingsProps = {
  startValue: number;
  maxValue: number;
  onSetupping: () => void;
  onChangeSettings: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CounterSettings({
  startValue,
  maxValue,
  onSetupping,
  onChangeSettings,
}: CounterSettingsProps) {
  const isStartValueValid = startValue >= 0;
  const isMaxValueValid = maxValue >= 0;
  const isMaxGreaterStart = maxValue > startValue;

  const isError = !isStartValueValid || !isMaxValueValid || !isMaxGreaterStart;

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
            onChange={onChangeSettings}
          />
        </label>
        <label>
          start value:
          <input
            className={!isStartValueValid || !isMaxGreaterStart ? "error" : ""}
            type="number"
            value={startValue}
            name="startValue"
            onChange={onChangeSettings}
          />
        </label>
      </div>
      <div className="buttons">
        <Button disabled={isError} onClick={onSetupping}>
          set
        </Button>
      </div>
    </div>
  );
}
