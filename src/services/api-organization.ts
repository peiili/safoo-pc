import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/oganization';
/**
 * 查看所负责的机构列表
 * @param {String} name
 * @param {String} pageNum
 * @param {String} pageSize -required false
 */
export async function getOrganizationList(
  name: string | undefined,
  pageNum: number,
  pageSize: number
) {
  return request<API.OrganizationResult>(
    `${basePath}/list?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'GET',
    }
  );
}
/**
 * 查看所负责的机构详情
 * @param {String} id
 */
export async function getOrganizationDetails(id: string) {
  return request<API.OrganizationDetailsResult>(`${basePath}/detail/${id}`, {
    method: 'GET',
  });
}
/**
 * 删除某个机构
 * @param {String} name
 * @param {String} pageNum
 * @param {String} pageSize -required false
 */
export async function delOrganization(id: string) {
  return request<API.OrganizationResult>(`${basePath}/detail/${id}`, {
    method: 'POST',
  });
}
