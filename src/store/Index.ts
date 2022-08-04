export const loginToken = {
  key: "token",
  get: (): string => {
    return localStorage.getItem(loginToken.key) ?? "";
  },
  set: (value: string) => {
    localStorage.setItem(loginToken.key, value);
  },
  clear: () => {
    localStorage.removeItem(loginToken.key);
  },
};