import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-scs/scs';
/**
 * 用户绑定设备
 * @param {string} id 设备id
 */
export function bindDevice(deviceId: string) {
  return request(`${basePath}/bind/${deviceId}`, { method: 'POST' });
}
/**
 * 用户解绑设备
 * @param {string} id 设备id
 */
export function unBindDevice(deviceId: string) {
  return request(`${basePath}/unbind/${deviceId}`, { method: 'POST' });
}
/**
 * 设备重命名
 * @param {Object} body
 * @param {String} body.deviceId 设备id
 * @param {String} body.name  新名称
 */
export function renameDevice(body: { deviceId: string; name: string }) {
  return request(`${basePath}/rename`, { method: 'POST', data: body });
}

/**
 * 获取用户绑定设备列表
 * @param {string}  auth token
 */
export function getBindDeviceList(pageNum: string, pageSize: string, orgId?: string) {
  return request(
    `${basePath}/cabinetlist?orgId=${orgId || ''}&pageNum=${pageNum}&pageSize=${pageSize}`,
    { method: 'GET' }
  );
}
/**
 * 开关灯控制
 * @param {Object}  body
 * @param {Object}  body.deviceId 设备id
 * @param {Number}  body.value    设置的值，0关 1开
 */
export function lightControl(body: { deviceId: string; value: 0 | 1 }) {
  return request(`${basePath}/lightctl`, { method: 'POST', data: body });
}
/**
 * 风扇控制
 * @param {Object}  body
 * @param {Object}  body.deviceId 设备id
 * @param {Number}  body.type     控制项：0风机运行模式 1.风机转速,可用值:0,1
 * @param {Number}  body.value    设置值，当type=0,风机运行模式，0到3分别对应自动运行、强制开启、强制关闭和时控模式.\n     当type=1,设置风机转速，整型数
 */
export function fanControl(body: { deviceId: string; type: 0 | 1; value: 0 | 1 | 2 | 3 | number }) {
  return request(`${basePath}/fanctl`, { method: 'POST', data: body });
}
/**
 * 获取设备状态信息
 * @param {String} deviceId
 */
export function getDeviceInfo(deviceId: string) {
  return request(`${basePath}/status/${deviceId}`, { method: 'GET' });
}
/**
 * 获取设备状态日志
 * @param {String} deviceId
 */
export function getDeviceLog(deviceId: string) {
  return request(`${basePath}/alerthistory/${deviceId}`, { method: 'GET' });
}
/**
 * 获取设备中存放的物品
 * @param {String} deviceId
 */
export function getDeviceStockInfo(deviceId: string) {
  return request(`${basePath}/stockInfo/${deviceId}`, { method: 'GET' });
}
