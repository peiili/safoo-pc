import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Select } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { Button, message, Descriptions, Popconfirm } from 'antd';
import { useIntl, FormattedMessage, useModel } from 'umi';
import {
  createDepartment,
  delDepartment,
  getDepartmentList,
  getDepartmentDetail,
  updateDepartmentCharge,
} from '@/services/api-department';
import { getChargeList } from '@/services/api-organization';

const { Option } = Select;

const handleAdd = async (fields: DepType.newDepartment) => {
  const hide = message.loading('正在添加');
  const res = await createDepartment({ ...fields });
  hide();
  if (res.code === 200) {
    message.success('添加成功');
    return true;
  }
  message.error('添加失败请重试！');
  return false;
};
const departmentList = async (params: DepType.tableParamsType | any) => {
  let data: any = {};
  await getDepartmentList(params.current, params.pageSize, params.keyword).then((res) => {
    data = {
      success: true,
      data: res.data.list,
      total: res.data.total,
    };
  });
  return data;
};

const DepartmentList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [listItems, setListItems] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    getChargeList({ orgId: String(currentUser?.organizationId) }).then((e) => {
      setListItems(e.data);
    });
  }, [currentUser?.organizationId]);
  /** 负责人列表 */
  function ChargeSelect(props: { currentCharge: string; handleOk: (value: string) => void }) {
    const { handleOk } = props;
    return (
      <Select
        defaultValue={props?.currentCharge}
        value={props?.currentCharge}
        style={{ width: '50%' }}
        onSelect={handleOk}
      >
        {listItems.map((item) => (
          <Option key={item.id} value={String(item.id)}>
            {item.nickName}
          </Option>
        ))}
      </Select>
    );
  }
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /** 国际化配置 */

  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  const [currentRow, setCurrentRowData] = useState<API.OrganizationDetails>({});

  const subminCharge = async (userid: string) => {
    return await updateDepartmentCharge({
      userid,
      orgDeptId: String(currentRow.id),
      assignType: '4',
    });
  };
  const setCurrentRow = async (id: string): Promise<void> => {
    await getDepartmentDetail(id).then((res) => {
      setCurrentRowData(res.data);
    });
  };
  const delDep = (id: string) => {
    return delDepartment(id);
  };
  const cancel = (): void => {};

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
      dataIndex: 'mgrUserid',
      title: '负责人',
      render: (_, record) => {
        return [<p key="mgr">{listItems.find((e) => e.id === record.mgrUserid)?.nickName}</p>];
      },
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
            编辑
          </a>,
          <Popconfirm
            title="是否删除当前部门"
            onConfirm={async () => {
              const success = await delDep(record.id);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={cancel}
            okText="是"
            cancelText="否"
            key="del"
          >
            <a href="#" style={{ color: 'red' }}>
              删除
            </a>
          </Popconfirm>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <Card>
        <ProTable<API.OrganizationDetails>
          actionRef={actionRef}
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '部门列表',
          })}
          columns={columns}
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
          request={departmentList}
          rowKey="id"
          pagination={{
            showQuickJumper: false,
          }}
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
            <Descriptions.Item label="部门代码">{currentRow.code}</Descriptions.Item>
            <Descriptions.Item label="部门名称">{currentRow.name}</Descriptions.Item>
            <Descriptions.Item label="部门介绍">{currentRow.description}</Descriptions.Item>
            <Descriptions.Item label="负责人">
              <ChargeSelect
                currentCharge={currentRow.mgrUserid ? String(currentRow.mgrUserid) : ''}
                handleOk={async (e: string) => {
                  const success = await subminCharge(e);
                  if (success) {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                }}
              />
            </Descriptions.Item>
          </Descriptions>
        </ModalForm>
      </Card>
      <ModalForm<DepType.newDepartment>
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

export default DepartmentList;
