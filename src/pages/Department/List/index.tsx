import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { message, Descriptions } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import { getDepartmentList, getDepartmentDetail } from '@/services/api-department';

type tableParamsType = {
  keyword: string;
  current: number;
  pageSize: number;
};
const departmentList = async (params: tableParamsType | any) => {
  let data: any = {};
  await getDepartmentList(params.current, params.pageSize, params.keyword).then((res) => {
    data = {
      success: true,
      data: res.data.list,
    };
  });
  return data;
};
const tableParams: tableParamsType = {
  keyword: '',
  current: 1,
  pageSize: 20,
};
const DepartmentList: React.FC = () => {
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  const [currentRow, setCurrentRowData] = useState<API.OrganizationDetails>({});
  const setCurrentRow = async (id: string): Promise<void> => {
    await getDepartmentDetail(id).then((res) => {
      setCurrentRowData(res.data);
    });
  };
  const columns: ProColumns<API.OrganizationDetails>[] = [
    {
      dataIndex: 'code',
      title: '部门代码',
    },
    {
      dataIndex: 'name',
      title: '部门名称',
    },
    {
      dataIndex: 'createdTime',
      title: '创建时间',
    },
    {
      dataIndex: 'description',
      title: '描述',
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key="edit"
            onClick={() => {
              setHandleUpdate(true);
              setCurrentRow(record.id);
            }}
          >
            详情
          </a>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <Card>
        <ProTable<API.OrganizationDetails>
          columns={columns}
          request={departmentList}
          rowKey="id"
          params={tableParams}
          pagination={{
            showQuickJumper: false,
          }}
          toolBarRender={false}
          search={false}
        />

        <ModalForm<{
          name: string;
          company: string;
        }>
          title="部门详情"
          visible={updateVisible}
          modalProps={{
            onCancel: () => setHandleUpdate(false),
          }}
          onFinish={async () => {
            message.success('提交成功');
            return true;
          }}
        >
          <Descriptions>
            <Descriptions.Item label="机构码">{currentRow.code}</Descriptions.Item>
            <Descriptions.Item label="机构名称">{currentRow.name}</Descriptions.Item>
            <Descriptions.Item label="负责人">{currentRow.mgrUserName}</Descriptions.Item>
            <Descriptions.Item label="手机号">{currentRow.mgrUserPhone}</Descriptions.Item>
            <Descriptions.Item label="销售人员">{currentRow.saleUserId}</Descriptions.Item>
            <Descriptions.Item label="技术支持">{currentRow.techUserName}</Descriptions.Item>
            <Descriptions.Item label="客服人员">{currentRow.srvUserName}</Descriptions.Item>
          </Descriptions>
        </ModalForm>
      </Card>
    </PageContainer>
  );
};

export default DepartmentList;
