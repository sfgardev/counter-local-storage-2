import { combine, createEvent, createStore, sample } from "effector";
import { getLocalStorageItem, setLocalStorageItem } from "../localStorage";

// Stores
export const $maxValue = createStore(
  getLocalStorageItem<number>("maxValue") || 0
);
export const $startValue = createStore(
  getLocalStorageItem<number>("startValue") || 0
);
export const $isSetupping = createStore(false);

export const $counter = createStore(
  getLocalStorageItem<number>("startValue") || 0
);

// Derived stores
export const $isStartValueValid = $startValue.map(
  (startValue) => startValue >= 0
);
export const $isMaxValueValid = $maxValue.map((maxValue) => maxValue >= 0);
export const $isMaxGreaterStart = combine([$maxValue, $startValue]).map(
  ([maxValue, startValue]) => maxValue > startValue
);

export const $isError = combine([
  $isStartValueValid,
  $isMaxValueValid,
  $isMaxGreaterStart,
]).map(
  ([isStartValueValid, isMaxValueValid, isMaxGreaterStart]) =>
    !isStartValueValid || !isMaxValueValid || !isMaxGreaterStart
);

// Events
export const maxValueChanged = createEvent<number>();
export const startValueChanged = createEvent<number>();
export const isSetuppingChanged = createEvent<boolean>();
export const counterIncremented = createEvent();
export const counterReseted = createEvent<number>();

$maxValue.on(maxValueChanged, (_state, maxValue) => maxValue);
$startValue.on(startValueChanged, (_state, startValue) => startValue);
$isSetupping.on(isSetuppingChanged, (_state, isSetupping) => isSetupping);

$counter.on(counterIncremented, (state) => state + 1);
$counter.on(counterReseted, (_state, counter) => counter);
$counter.on(startValueChanged, (_state, startValue) => startValue);

const sampled = sample({
  clock: [startValueChanged, maxValueChanged],
  source: [$startValue, $maxValue],
});

sampled.watch(([startValue, maxValue]) => {
  setLocalStorageItem("startValue", startValue);
  setLocalStorageItem("maxValue", maxValue);
});
