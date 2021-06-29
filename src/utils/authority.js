import { notification, message } from 'antd';
// use localStorage to store the authority info, which might be sent from server in actual project.
import { routerRedux } from 'dva/router';

export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
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

/**
 * 判断是否拥有当前资源的权限
 * @param auth 权限
 * @returns {boolean}
 */
export function haveAuthority(auth) {
  const currentAuth = getAuthority();
  if (currentAuth === null) {
    return false;
  }

  return currentAuth.includes(auth);
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function backCall(put, response) {
  const {errCode, errMsg} = response;
  // 调用失败
  if (errCode !== undefined && errCode != null && errCode !== 200) {
    // 提示失败的弹窗
    notification.error({
      message: `${errCode}`,
      description: `${errMsg}`,
    });
  }

  put(routerRedux.replace('/exception/404'));
}
