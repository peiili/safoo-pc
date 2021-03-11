
export const getCacheValue = (name: string): string | null => {
  var _value = localStorage['safoo_' + name] || localStorage['v_' + name];
  if (!_value) {
    var match = document.cookie.match("(^|;) ?" + 'safoo_' + name + "=([^;]*)(;|$)");
    _value = match ? decodeURI(match[2]) : match;
  }
  if (_value && _value !== "") {
    return decodeURIComponent(_value);
  } else {
    return null;
  }
}

export const setCacheValue = (name: string, value: string): void => {
  if (!value && value !== "") {
    localStorage.removeItem('safoo_' + name);
  } else {
    localStorage.setItem('safoo_' + name, encodeURIComponent(value));
  }
}

export const setUserId = (data: string) => {
  return setCacheValue('userId', data)
}
