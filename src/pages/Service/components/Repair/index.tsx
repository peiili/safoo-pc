import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';
import { getMaintainList, maintainInput } from '@/services/api-support';
import { Button, Form, message } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import Details from '@/pages/Device/Details/index';

type FormType = {
  deviceId: string;
  description: string;
  measure: string;
};

const Repair: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const [newForm] = Form.useForm();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const productionList = async () => {
    let data: any = {};
    await getMaintainList({
      begin: '',
      deviceId: '',
      end: '',
      pageNum: '1',
      pageSize: '20',
      type: 1,
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
    const res = await maintainInput({ ...fields, type: 1 });
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
            查看设备
          </a>,
        ];
      },
    },
  ];
  return (
    <>
      <ProTable<API.OrganizationDetails>
        actionRef={actionRef}
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
      <ModalForm
        title="安装详情"
        visible={showDetails}
        width={window.innerWidth / 1.5}
        modalProps={{
          onCancel: () => false,
        }}
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
        <div style={{ background: '#eef0f4' }}>
          <Details id={currentRow.deviceId} readonly={true} />
        </div>
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
          label="柜机码"
          rules={[
            {
              required: true,
              message: '柜机码不能为空',
            },
          ]}
          width="md"
          name="deviceId"
        />
        <ProFormTextArea
          label="故障现象"
          rules={[
            {
              required: true,
              message: '故障现象不能为空',
            },
          ]}
          placeholder="请输入故障现象"
          width="md"
          name="description"
        />
        <ProFormTextArea
          label="维修措施"
          rules={[
            {
              required: true,
              message: '维修措施不能为空',
            },
          ]}
          placeholder="请输入维修措施"
          width="md"
          name="measure"
        />
      </ModalForm>
    </>
  );
};
export default Repair;
