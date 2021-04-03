// @ts-ignore
/* eslint-disable */
declare namespace DepType {
  type newDepartment = {
    code: string;
    name: string;
    deptType: string;
    description: string;
  };
  type tableParamsType = {
    keyword: string;
    current: number;
    pageSize: number;
  };
  type updateCharge = {
    userid: string;
    orgDeptId: string;
    assignType: '4' | '7' | '8' | '9';
  };
  type updateDep = {
    id: string;
    description: string;
    code: string;
    name: string;
  };
}
