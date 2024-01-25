export const getTokenFromLocalStorage = () => localStorage.getItem('token');

export const setTokenToLocalStorage = (value: string) =>
  localStorage.setItem('token', value);

export const removeTokenFromLocalStorage = () =>
  localStorage.removeItem('token');

export const clearLocalStorage = () => localStorage.clear();
