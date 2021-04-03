import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/prodlifecycle';

type getProductionListQuery = {
  begin: string;
  deviceId: string;
  end: string;
  pageNum: string;
  pageSize: string;
};
type getSetupListQuery = getProductionListQuery;

/**
 * 维修维保信息录入
 * @param {Object} data
 * @param {String} data.cause
 * @param {String} data.description
 * @param {String} data.deviceId
 * @param {String} data.measure
 * @param {String} data.type  1是维修，2是维保
 */
export function maintainInput(data: DeviceType.maintainInputQuery) {
  return request(`${basePath}/maintenance`, {
    method: 'POST',
    data,
  });
}
/**
 * getMaintainList
 * @param {Object} body
 * @param {String} body.begin 	开始日期
 * @param {String} body.deviceId 设备编号
 * @param {String} body.end 结束日期
 * @param {String} body.pageNum
 * @param {String} body.pageSize
 * @param {String} body.type  1是维修，2是维保
 */
export function getMaintainList(body: DeviceType.getMaintainListQuery) {
  return request(
    `${basePath}/maintenanceList?type=${body.type}&begin=${body.begin}&deviceId=${body.deviceId}&end=${body.end}&pageNum=${body.pageNum}&pageSize=${body.pageSize}`,
    { method: 'get' }
  );
}
/**
 * 生产调试信息录入
 * @param {Object} data
 * @param {String} data.remark
 * @param {String} data.name
 * @param {String} data.deviceId
 */
export function productionInput(data: DeviceType.newRepair) {
  return request(`${basePath}/production`, { method: 'POST', data });
}
/**
 * getProductionList
 * @param {Object} body
 * @param {String} body.begin 	开始日期
 * @param {String} body.deviceId 设备编号
 * @param {String} body.end 结束日期
 * @param {String} body.pageNum
 * @param {String} body.pageSize
 */
export function getProductionList(body: getProductionListQuery) {
  return request(
    `${basePath}/productionList?begin=${body.begin}&deviceId=${body.deviceId}&end=${body.end}&pageNum=${body.pageNum}&pageSize=${body.pageSize}`,
    { method: 'GET' }
  );
}
/**
 * getSetupList
 * @param {Object} body
 * @param {String} body.begin 	开始日期
 * @param {String} body.deviceId 设备编号
 * @param {String} body.end 结束日期
 * @param {String} body.pageNum
 * @param {String} body.pageSize
 */

export function getSetupList(body: getSetupListQuery) {
  return request(
    `${basePath}/setupList?begin=${body.begin}&deviceId=${body.deviceId}&end=${body.end}&pageNum=${body.pageNum}&pageSize=${body.pageSize}`,
    { method: 'GET' }
  );
}
/**
 * getSetupList
 * @param {Object} data
 * @param {String} data.deviceId 设备编号
 * @param {String} data.orgId
 * @param {String} data.orgName
 * @param {String} data.remark
 */

export function setupInstall(data: DeviceType.Install) {
  return request(`${basePath}/setup`, { method: 'POST', data });
}

export function getProductInfo(keyWords: string) {
  return request(`${basePath}/productInfo/${keyWords}`, { method: 'GET' });
}
