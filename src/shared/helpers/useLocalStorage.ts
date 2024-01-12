export const setLocalStorage = <T>(path: string, value: T) => {
  localStorage.setItem(path, JSON.stringify(value));
};
export const getLocalStorage = (path: string) => {
  return localStorage.getItem(path);
};
export const removeLocalStorage = (path: string) => {
  return localStorage.removeItem(path);
};
