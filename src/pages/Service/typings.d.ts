declare namespace DeviceType {
  type newRepair = {
    deviceId: string;
    name: string;
    remark: string;
  };
  type update = {
    id: string | number;
    code: string;
    name: string;
  };
  type maintainInputQuery = {
    cause?: string;
    description: string;
    deviceId: string;
    measure: string;
    type: number;
  };
  type getMaintainListQuery = {
    begin: string;
    deviceId: string;
    end: string;
    pageNum: string;
    pageSize: string;
    type: number;
  };
  type Install = {
    deviceId: string;
    orgId: number;
    orgName: string;
    remark: string;
  };
}
