import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getSetupList } from '@/services/api-support';

const Install: React.FC = () => {
  const chargeList = async () => {
    let data: any = {};
    await getSetupList({
      begin: '',
      deviceId: '',
      end: '',
      pageNum: '1',
      pageSize: '20',
    }).then((res) => {
      data = {
        success: true,
        data: res.data.list,
      };
    });
    return data;
  };
  const [tmpParams] = useState<any>();
  const columns: ProColumns<API.OrganizationDetails>[] = [
    {
      dataIndex: 'nickName',
      title: '姓名',
    },
    {
      dataIndex: 'account',
      title: '账号',
    },
    {
      dataIndex: 'departmentName',
      title: '所属部门',
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: () => {
        return [
          <a
            key="edit"
            onClick={() => {
              // setHandleUpdate();
              // setCurrentRow(record);
            }}
          >
            更换部门
          </a>,
        ];
      },
    },
  ];
  return (
    <ProTable<API.OrganizationDetails>
      columns={columns}
      request={chargeList}
      rowKey="id"
      params={tmpParams}
      pagination={{
        showQuickJumper: false,
      }}
      toolBarRender={false}
      search={false}
    />
  );
};
export default Install;
