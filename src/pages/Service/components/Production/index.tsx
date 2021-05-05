import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProductionList, productionInput, getProductInfo } from '@/services/api-support';
import { useIntl, FormattedMessage } from 'umi';
import { AutoComplete, Button, Form, message } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import Details from '@/pages/Device/Details/index';

let a: number;
function getList(keywords: string) {
  return new Promise<API.OrganizationResult>((resolve) => {
    if (a) {
      clearTimeout(a);
    }
    a = window.setTimeout(async () => {
      const res = await getProductInfo(keywords);
      resolve(res);
    }, 500);
  });
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
  const [selectEnum, setSelectEnum] = useState<{ value: string }[]>([]);
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
            查看设备
          </a>,
        ];
      },
    },
  ];

  const handleSearch = async (name?: string) => {
    if (name) {
      const res = await getList(name);
      const data = res.data?.list.map((d) => {
        return { value: d.name };
      });
      setSelectEnum(data);
    }
  };
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
        <ProForm.Item
          name="deviceId"
          label="设备码"
          rules={[
            {
              required: true,
              message: '设备码不能为空',
            },
          ]}
        >
          <AutoComplete
            options={selectEnum}
            style={{ width: 328 }}
            onSearch={handleSearch}
            placeholder="请输入设备码"
          />
        </ProForm.Item>
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
