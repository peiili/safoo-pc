// import { Popconfirm, Space, Menu, Dropdown } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { getOrganizationList } from '@/services/api-organization';

const organizationList = async (params: any) => {
  let data: any = {};
  await getOrganizationList(params.keyword, params.current, params.pageSize).then((res) => {
    data = {
      success: true,
      data: res.data.list,
    };
  });
  return data;
};

const OrganizationList: React.FC = () => {
  const [updateVisibele, setHandleUpdate] = useState(false);
  // const [currentRow, setCurrentRow] = useState<API.OrganizationDetails>();
  // const handleUpdateModalVisible = (params: any) => {
  //   console.log(currentRow);
  // };
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
      render: () => {
        return [
          <a
            key="edit"
            onClick={() => {
              setHandleUpdate(true);
              // setCurrentRow(record);
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
      {/* <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      /> */}

      <ModalForm<{
        name: string;
        company: string;
      }>
        title="新建表单"
        visible={updateVisibele}
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />

          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="主合同编号" />
        <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
      </ModalForm>
    </PageContainer>
  );
};

export default OrganizationList;
