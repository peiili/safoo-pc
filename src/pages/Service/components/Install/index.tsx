import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';
import { getSetupList, setupInstall } from '@/services/api-support';
import { getOrganizationList } from '@/services/api-organization';
import { Button, Form, message, Select } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import Details from '@/pages/Device/Details/index';

const { Option } = Select;

let a: number;
function getList(name?: string) {
  return new Promise<API.OrganizationResult>((resolve) => {
    if (a) {
      clearTimeout(a);
    }
    a = window.setTimeout(async () => {
      const res = await getOrganizationList(name, 1, 50);
      resolve(res);
    }, 500);
  });
}

type FormType = {
  deviceId: string;
  orgId: string;
  remark: string;
};
const Install: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const [newForm] = Form.useForm();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
  const [showDetails, setupShowDetails] = useState<boolean>(false);
  const [currentRow, setDetails] = useState<any>({});
  const [selectEnum, setSelectEnum] = useState<React.ReactNode[]>([]);

  const setCurrentRow = (data: any): void => {
    setupShowDetails(true);
    setDetails(data);
  };
  const handleAdd = async (fields: FormType) => {
    const hide = message.loading('正在添加');
    const res = await setupInstall({
      ...fields,
      orgName: fields.orgId.split('_')[1],
      orgId: Number(fields.orgId.split('_')[0]),
    });
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
      dataIndex: 'deviceName',
      title: '设备名称',
    },
    {
      dataIndex: 'setupTime',
      title: '安装时间',
    },
    {
      dataIndex: 'orgName',
      title: '所属机构',
    },
    {
      dataIndex: 'orgMgrNickName',
      title: '负责人',
    },
    {
      dataIndex: 'orgMgrPhone',
      title: '联系方式',
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
    const res = await getList(name);
    const data = res.data.list.map((d) => (
      <Option key={d.id} value={`${d.id}_${d.name}`}>
        {d.name}
      </Option>
    ));
    setSelectEnum(data);
  };
  return (
    <>
      <ProTable<API.OrganizationDetails>
        columns={columns}
        request={chargeList}
        rowKey="id"
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
          console.log(value);
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
          name="orgId"
          label="机构"
          rules={[
            {
              required: true,
              message: '机构名称不能为空',
            },
          ]}
        >
          <Select
            style={{ width: 328 }}
            allowClear={true}
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onFocus={() => handleSearch()}
            notFoundContent={null}
            placeholder="请输入机构名称并选择"
          >
            {selectEnum}
          </Select>
        </ProForm.Item>
        <ProFormText
          label="设备码"
          rules={[
            {
              required: true,
              message: '设备码不能为空',
            },
          ]}
          placeholder="请输入设备码"
          width="md"
          name="deviceId"
        />
        <ProFormTextArea label="备注" width="md" name="remark" />
      </ModalForm>
    </>
  );
};
export default Install;
