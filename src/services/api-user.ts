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
export function updatePassword(body: LOGIN.rePassword) {
  return request(
    `${basePath}/updatePassword?authCode=${body.authCode}&password=${body.password}&telephone=${body.telephone}`,
    { method: 'POST' }
  );
}
/**
 * 普通用户申请操作设备权限
 * @param {String} deviceId  需要申请权限的设备
 */
export function requestDeviceOp(deviceId: string) {
  return request(`${basePath}/requestDeviceOp?deviceId=${deviceId}`, { method: 'POST' });
}
