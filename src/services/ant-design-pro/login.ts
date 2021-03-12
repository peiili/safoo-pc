// @ts-ignore
/* eslint-disable */
import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/sso';
/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${basePath}/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login */
export async function login(password: string, username: string) {
  return request<API.LoginResult>(`${basePath}/login?password=${password}&account=${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return request<API.ResultUser>(`${basePath}/info`, {
    method: 'GET',
  });
}
