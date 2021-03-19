import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/work';
/**
 * 对用户注册或操作设备请求进行审批
 * @param {Object} body
 * @param {String} body.cause 拒绝原因
 * @param {String} body.departmentId 如果是审批用户注册请求，此字段用于给该用户分配部门，填部门Id
 * @param {String} body.endTime 如果是审批设备操作请求，此字段填授权的结束时间: 例如 2020-02-12 17:30:00, 不填默认10分钟后授权失效
 * @param {String} body.flowItemId  -required 	授权审批事项Id
 * @param {Number} body.status -required 审批：2同意 3拒绝
 */
type auditApplyType = {
  cause: string;
  departmentId: string;
  endTime: string;
  flowItemId: string;
  status: '2' | '3';
};
export function auditApply(body: auditApplyType) {
  return request(`${basePath}/dispose`, { method: 'POST', data: body });
}
/**
 * 获取某审核流程详情
 * @param {String} id
 */
export function getAuditFlow(id: string) {
  return request(`${basePath}/detail/${id}`, { method: 'POST' });
}
/**
 * 获取待审批事项列表
 */
export function getTodoList() {
  return request(`${basePath}/todolist`, { method: 'GET' });
}
