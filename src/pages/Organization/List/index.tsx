// import { Popconfirm, Space, Menu, Dropdown } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { Button, message, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import {
  createOrganization,
  getOrganizationList,
  getOrganizationDetails,
} from '@/services/api-organization';

const handleAdd = async (fields: ORGTYPE.create) => {
  const hide = message.loading('正在添加');
  const res = await createOrganization({ ...fields });
  hide();
  if (res.code === 200) {
    message.success('添加成功');
    return true;
  }
  message.error('添加失败请重试！');
  return false;
};

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
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /** 国际化配置 */

  const actionRef = useRef<ActionType>();
  const intl = useIntl();
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
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
          ]}
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
      <ModalForm<ORGTYPE.create>
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newDepartment',
          defaultMessage: '新建部门',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          handleModalVisible(false);
          const success = await handleAdd(value);
          if (success) {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="部门名称"
          rules={[
            {
              required: true,
              message: '部门名称不能为空',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText label="部门代码" width="md" name="code" />
        <ProFormTextArea label="部门描述" width="md" name="description" />
      </ModalForm>
    </PageContainer>
  );
};

export default OrganizationList;
