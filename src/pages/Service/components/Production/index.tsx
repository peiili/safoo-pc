import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProductionList, productionInput } from '@/services/api-support';
import { useIntl, FormattedMessage } from 'umi';
import { Button, Descriptions, Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

function DetailsModal(props: { details: Record<string, any> }) {
  const column: Record<string, any>[] = [
    { label: '设备名称', key: 'deviceName' },
    { label: '设备地址', key: 'orgAddress' },
    { label: '安装时间', key: 'setupTime' },
    { label: '机构地址', key: 'orgAddress' },
    { label: '机构码', key: 'orgMgrId' },
    { label: '机构名称', key: 'orgName' },
    { label: '机构管理员', key: 'orgMgrNickName' },
    { label: '联系方式', key: 'orgMgrPhone' },
    { label: '技术支持', key: 'techNickName' },
    { label: '技术支持电话', key: 'techUserPhone' },
  ];
  const ele = column.map((e) => {
    return (
      <Descriptions.Item key={e.key} label={e.label}>
        {props.details[e.key]}
      </Descriptions.Item>
    );
  });
  return (
    <>
      <Descriptions bordered column={2}>
        {ele}
      </Descriptions>
    </>
  );
}
type FormType = {
  deviceId: string;
  name: string;
  remark: string;
};

const Production: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const [newForm] = Form.useForm();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const productionList = async () => {
    let data: any = {};
    await getProductionList({
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
  const [showDetails, setupShowDetails] = useState<boolean>(false);
  const [currentRow, setDetails] = useState<any>({});
  const setCurrentRow = (data: any): void => {
    setupShowDetails(true);
    setDetails(data);
  };
  const handleAdd = async (fields: FormType) => {
    const hide = message.loading('正在添加');
    const res = await productionInput({ ...fields });
    hide();
    if (res.code === 200) {
      message.success('添加成功');
      newForm.resetFields();
      return true;
    }
    message.error('添加失败请重试！');
    return false;
  };
  const columns: ProColumns<API.OrganizationDetails>[] = [
    {
      dataIndex: 'deviceId',
      title: 'ID',
    },
    {
      dataIndex: 'name',
      title: '设备名称',
    },
    {
      dataIndex: 'created',
      title: '安装时间',
    },
    {
      dataIndex: 'techOrgName',
      title: '技术支持',
    },
    {
      dataIndex: 'techUserName',
      title: '技术负责人',
    },
    {
      dataIndex: 'remark',
      title: '备注',
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
              setCurrentRow(record);
            }}
          >
            详情
          </a>,
          <a
            key="edit"
            onClick={() => {
              // setHandleUpdate();
              // setCurrentRow(record);
            }}
          >
            控制设备
          </a>,
        ];
      },
    },
  ];
  return (
    <>
      <ProTable<API.OrganizationDetails>
        columns={columns}
        request={productionList}
        rowKey="deviceId"
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
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新增" />
          </Button>,
        ]}
        search={false}
      />
      <ModalForm<{
        name: string;
        company: string;
      }>
        title="安装详情"
        visible={showDetails}
        submitter={{
          render: () => {
            return [
              <Button
                onClick={() => {
                  setupShowDetails(false);
                }}
              >
                关闭
              </Button>,
            ];
          },
        }}
      >
        <DetailsModal details={currentRow} />
      </ModalForm>
      <ModalForm<FormType>
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.new',
          defaultMessage: '',
        })}
        width="400px"
        form={newForm}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="设备码"
          rules={[
            {
              required: true,
              message: '设备码不能为空',
            },
          ]}
          width="md"
          name="deviceId"
        />
        <ProFormText
          label="设备名称"
          rules={[
            {
              required: true,
              message: '设备名称不能为空',
            },
          ]}
          placeholder="请输入设备名称"
          width="md"
          name="name"
        />
        <ProFormTextArea label="备注" width="md" name="remark" />
      </ModalForm>
    </>
  );
};
export default Production;
