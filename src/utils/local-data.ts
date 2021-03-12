export const getCacheValue = (name: string): string | null => {
  const value = localStorage[`safoo_${name}`] || localStorage[`v_${name}`];
  if (value && value !== '') {
    return decodeURIComponent(value);
  }
  return null;
};

export const setCacheValue = (name: string, value: string): void => {
  if (!value && value !== '') {
    localStorage.removeItem(`safoo_${name}`);
  } else {
    localStorage.setItem(`safoo_${name}`, encodeURIComponent(value));
  }
};

export const setUserId = (data: string) => {
  return setCacheValue('userId', data);
};
