export const getLocalStorageItem = <T>(key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setLocalStorageItem = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
