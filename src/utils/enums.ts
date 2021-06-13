const enums = {
  organization: {
    '1': {
      label: '总部',
    },
    '2': {
      label: '销售商',
    },
    '3': {
      label: '客户',
    },
  },
  departmentType: {
    '1': {
      key: 1,
      label: '销售部',
    },
    '2': {
      key: 2,
      label: '技术支持部',
    },
    '3': {
      key: 3,
      label: '客服部',
    },
  },
  roles: {
    '2': {
      label: '总部机构管理员',
    },
    '3': {
      label: '代理商机构管理员',
    },
    '4': {
      label: '客户机构管理员',
    },
    '5': {
      label: '部门管理员',
    },
    '6': {
      label: '普通用户',
    },
    '7': {
      label: '客服维修人员（总部，代理商）',
    },
    '8': {
      label: '销售人员',
    },
    '9': {
      label: '安装维护人员',
    },
  },
  assignType: {
    '4': {
      key: 4,
      label: '用户机构、部门负责人',
    },
    '7': {
      key: 7,
      label: '客服人员',
    },
    '8': {
      key: 8,
      label: '销售人员',
    },
    '9': {
      key: 9,
      label: '安装维护人员',
    },
  },
  fileType: {
    '0': {
      key: 0,
      label: '说明书',
    },
  },
};

export function translateEnums(gloup: string, key: string | number): string {
  return enums[gloup][key].label;
}
