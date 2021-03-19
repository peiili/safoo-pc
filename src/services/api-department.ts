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
export async function getDepartmentDetail(id: string) {
  return request(`${basePath}/detail/${id}`, { method: 'GET' });
}
