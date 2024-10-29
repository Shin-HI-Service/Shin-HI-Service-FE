const storageKey = "USER_DEFAULT_PRIVACY";

export const storeUserInfo = (info: Model.DefaultDatas): void => {
  localStorage.setItem(storageKey, JSON.stringify(info));
};
export const removeUserInfo = (): void => {
  localStorage.removeItem(storageKey);
};
export const getUserInfo = (): Model.DefaultDatas | null => {
  const info = localStorage.getItem(storageKey);
  return info ? JSON.parse(info) : null;
};
