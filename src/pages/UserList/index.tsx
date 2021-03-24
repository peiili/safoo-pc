import { Card, Modal, Select, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useModel } from 'umi';
import type { departmentDomain } from '@/services/api-department';
import { getChargeList, updateCharge } from '@/services/api-organization';
import { getDepartmentList } from '@/services/api-department';

const { Option } = Select;
function DepartmentList(props: {
  currentCharge: Record<string, any>;
  handleOk: (value: number) => void;
}) {
  const { handleOk } = props;
  const [listItems, setListItems] = useState<departmentDomain[]>([]);
  useEffect(() => {
    getDepartmentList(1).then((e) => {
      setListItems(e.data.list);
    });
  }, []);
  return (
    <Select
      defaultValue={props?.currentCharge?.departmentId}
      value={props?.currentCharge?.departmentId}
      style={{ width: '100%' }}
      onSelect={handleOk}
    >
      {listItems.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
}
const UserList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const chargeList = async () => {
    let data: any = {};
    await getChargeList({
      account: '',
      orgId: currentUser?.organizationId,
    }).then((res) => {
      data = {
        success: true,
        data: res.data,
      };
    });
    return data;
  };
  const [modelVisible, setModelVisible] = useState<boolean>(false);
  const [confirmLoading, setLoading] = useState<boolean>(false);
  const [currentCharge, setCurrentRow] = useState<any>();
  const [tmpParams, settmpParams] = useState<any>();
  const setHandleUpdate = () => {
    setModelVisible(true);
  };
  /**
   *  提交部门
   */
  let selectDepartment: number;
  const handleOk = (): void => {
    setLoading(true);
    updateCharge(selectDepartment, currentCharge.id).then((res) => {
      setLoading(false);
      message.success(res.message);
      settmpParams({ a: Math.random() });
      setModelVisible(false);
    });
  };
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
      render: (_, record) => {
        return [
          <a
            key="edit"
            onClick={() => {
              setHandleUpdate();
              setCurrentRow(record);
            }}
          >
            更换部门
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
          request={chargeList}
          rowKey="id"
          params={tmpParams}
          pagination={{
            showQuickJumper: false,
          }}
          toolBarRender={false}
          search={false}
        />
        <Modal
          title="更换部门"
          visible={modelVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setModelVisible(false)}
        >
          <DepartmentList
            currentCharge={currentCharge}
            handleOk={(e: number) => {
              selectDepartment = e;
            }}
          ></DepartmentList>
        </Modal>
      </Card>
    </PageContainer>
  );
};

export default UserList;
