// import { Popconfirm, Space, Menu, Dropdown } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { message, Descriptions } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import { getOrganizationList, getOrganizationDetails } from '@/services/api-organization';

const organizationList = async (params: any) => {
  let data: any = {};
  await getOrganizationList(params.keyword, params.current, params.pageSize).then((res) => {
    data = {
      success: true,
      data: res.data.list,
      total: res.data.total,
    };
  });
  return data;
};

const OrganizationList: React.FC = () => {
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  const [currentRow, setCurrentRowData] = useState<API.OrganizationDetails>({});
  const setCurrentRow = async (id: string): Promise<void> => {
    await getOrganizationDetails(id).then((res) => {
      setCurrentRowData(res.data);
    });
  };
  const columns: ProColumns<API.OrganizationDetails>[] = [
    {
      dataIndex: 'code',
      title: '机构码',
    },
    {
      dataIndex: 'name',
      title: '机构名称',
    },
    {
      dataIndex: 'address',
      title: '地址',
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
          request={organizationList}
          rowKey="code"
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
          title="机构详情"
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

export default OrganizationList;
