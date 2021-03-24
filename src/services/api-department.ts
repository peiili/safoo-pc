import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/department';
/**
 * 查看机构的部门列表
 * @param {String} orgId -required 机构Id
 * @param {String} account
 */
export type departmentDomain = {
  code: string;
  createdTime: string;
  description: string;
  id: number;
  name: string;
  organizationId: number;
  type: number;
};
type departmentList = {
  data: { list: departmentDomain[] };
  pageNum: number;
  pageSize: number;
  total: number;
  totalPage: number;
} & API.Response;
export async function getDepartmentList(pageNum: number, pageSize: number = 20, name?: string) {
  return request<departmentList>(
    `${basePath}/list?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'GET',
    }
  );
}
/**
 * 查看机构详情
 * @param {String} id -required
 */
export function getDepartmentDetail(id: string) {
  return request(`${basePath}/detail/${id}`, { method: 'GET' });
}
/**
 * 由总部销售或经销商创建机构
 * @param {Object} body
 * @param {String} body.code -required 机构代码,默认为负责人手机号
 * @param {String} body.name -required 机构名
 * @param {String} body.deptType -required 机构类型
 * @param {String} body.description -required 部门接晒
 *
 */

export function createDepartment(body: DepType.newDepartment) {
  return request(`${basePath}/create`, { method: 'POST', data: body });
}
