import { useUnit } from "effector-react";
import Counter from "./Counter";
import CounterSettings from "./CounterSettings";
import { $isSetupping } from "./store/counter-store";

export default function CounterView() {
  const [isSetupping] = useUnit([$isSetupping]);

  return isSetupping ? <CounterSettings /> : <Counter />;
}
