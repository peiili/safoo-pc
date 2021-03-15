// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    createTime?: string;
    departmentCode?: string;
    departmentId?: number;
    departmentName?: string;
    departmentType?: number;
    id: number;
    nickname?: string;
    organizationCode?: string;
    organizationId?: number;
    organizationName?: string;
    organizationType?: number;
    phone?: string;
    roleType?: number;
    roles: RuleListItem[];
    status: number;
    username: string;
    wxUnionid?: string;
  };
  type ResultUser = {
    code?: number;
    status?: string;
    data: CurrentUser;
    message?: string;
  };
  type LoginResultData = {
    expiresIn: string;
    tokenHead: string;
    token: string;
    refreshToken: string;
  };
  type LoginResult = {
    code?: number;
    status?: string;
    data: LoginResultData;
    message?: string;
    type?: string;
    currentAuthority?: string;
  };
  type OrganizationDetails = {
    address: string;
    code: string;
    createdTime: string;
    id: number;
    mgrUserid: number;
    name: string;
  };
  type OrganizationResult = {
    code: number;
    data: PageParams & PageResult & { list: OrganizationDetails[] };
    message: string;
  };
  type PageParams = {
    pageNum?: number;
    pageSize?: number;
  };
  type PageResult = {
    total?: number;
    totalPage?: number;
  };

  type RuleListItem = {
    id: number;
    name: string;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username: string;
    password: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    code: number;
    /** 业务上的错误信息 */
    message?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
