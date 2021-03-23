import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/sso';

/**
 * 获取短信验证码
 * @param {String} required telephone
 */
export function getAuthCode(telephone: string) {
  return request(`${basePath}/getAuthCode?telephone=${telephone}`, { method: 'GET' });
}

export function userRegister({
  authCode,
  telephone,
  password,
  username,
  departmentCode = null,
  organizationCode = null,
}: LOGIN.registryForm) {
  return request(
    `${basePath}/register?authCode=${authCode}&password=${password}&telephone=${telephone}&username=${username}&departmentCode=${departmentCode}&organizationCode=${organizationCode}`,
    { method: 'POST' }
  );
}
