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
