import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/oganization';

/**
 * 由总部销售或经销商创建机构
 * @param {Object} body
 * @param {Object} body.reqBean -required
 * @param {String} body.reqBean.address  机构地址
 * @param {String} body.reqBean.code -required 机构代码,默认为负责人手机号
 * @param {String} body.reqBean.id
 * @param {String} body.reqBean.name -required 机构名
 * @param {String} body.reqBean.areaCode -required 区
 * @param {String} body.reqBean.cityCode -required 市
 * @param {String} body.reqBean.provinceCode -required 省
 */
export function createOrganization(body: ORGTYPE.create) {
  return request(`${basePath}/create`, { method: 'POST', data: { reqBean: body } });
}

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

/**
 * 获取机构人员列表
 * @param {Object} body
 * @param {String} body.orgId -机构id
 * @param {String} body.account  -手机账号
 */

type USERLIST = {
  data: Record<string, any>[];
} & API.Response;
export function getChargeList(body: { account?: string; orgId?: string }) {
  return request<USERLIST>(
    `${basePath}/members?orgId=${body.orgId}${body.account ? `&account=${body.account}` : ''}`,
    {
      method: 'GET',
    }
  );
}

/**
 * 更新机构人员列表
 * @param {Object} body
 * @param {String} body.orgDeptId - 机构或部门id
 * @param {String} body.userId  - 人员id
 * @param {String} body.assignType  - 指定对象： 4.用户机构、部门负责人，6.普通人员 7。客服人员 8.销售人员 9安装维护人员
 */

export async function updateCharge(
  orgDeptId: number,
  userid: string,
  assignType?: '4' | '6' | '7' | '8' | '9'
) {
  return request<API.Response>(`${basePath}/assignUser`, {
    method: 'POST',
    data: {
      orgDeptId,
      userid,
      assignType,
    },
  });
}
