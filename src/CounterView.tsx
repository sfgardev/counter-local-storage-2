import { ChangeEvent, useState } from "react";
import Counter from "./Counter";
import CounterSettings from "./CounterSettings";

const getLocalStorageItem = <T,>(key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

const setLocalStorageItem = <T,>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export default function CounterView() {
  const [settings, setSettings] = useState({
    startValue: getLocalStorageItem<number>("startValue") || 0,
    maxValue: getLocalStorageItem<number>("maxValue") || 0,
  });

  const [isSetupping, setIsSetupping] = useState(false);

  const handleChangeSettings = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSettings((settings) => ({
      ...settings,
      [name]: +value,
    }));
    setLocalStorageItem(name, +value);
  };

  const handleSetupping = () => {
    setIsSetupping((setupping) => !setupping);
  };

  return (
    <>
      {isSetupping ? (
        <CounterSettings
          startValue={settings.startValue}
          maxValue={settings.maxValue}
          onChangeSettings={handleChangeSettings}
          onSetupping={handleSetupping}
        />
      ) : (
        <Counter
          startValue={settings.startValue}
          maxValue={settings.maxValue}
          onSetupping={handleSetupping}
        />
      )}
    </>
  );
}
