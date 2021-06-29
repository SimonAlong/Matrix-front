export function getUserInfo(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('user-info') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setUserInfo(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('user-info', JSON.stringify(proAuthority));
}
