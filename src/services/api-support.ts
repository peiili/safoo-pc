import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/prodlifecycle';
type maintainInputQuery = {
  cause: string;
  description: string;
  deviceId: string;
  measure: string;
  type: string;
};
type getProductionListQuery = {
  begin: string;
  deviceId: string;
  end: string;
  pageNum: string;
  pageSize: string;
};
type getSetupListQuery = getProductionListQuery;
type getMaintainListQuery = {
  begin: string;
  deviceId: string;
  end: string;
  pageNum: string;
  pageSize: string;
  type: string;
};
type productionInputQuery = {
  remark: string;
  deviceId: string;
};

/**
 * 维修维保信息录入
 * @param {Object} body
 * @param {String} body.cause
 * @param {String} body.description
 * @param {String} body.deviceId
 * @param {String} body.measure
 * @param {String} body.type  1是维修，2是维保
 */
export function maintainInput(body: maintainInputQuery) {
  return request(`${basePath}/maintenance`, { method: 'POST', data: body });
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
export function getMaintainList(body: getMaintainListQuery) {
  return request(
    `${basePath}/maintenanceList?type=${body.type}&begin=${body.begin}&deviceId=${body.deviceId}&end=${body.end}&pageNum=${body.pageNum}&pageSize=${body.pageSize}`,
    { method: 'get' }
  );
}
/**
 * 生产调试信息录入
 * @param {Object} body
 * @param {String} body.remark
 * @param {String} body.deviceId
 */
export function productionInput(body: productionInputQuery) {
  return request(`${basePath}/production`, { method: 'POST', data: body });
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
