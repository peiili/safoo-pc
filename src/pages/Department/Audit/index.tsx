import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Radio, Card, Descriptions, message } from 'antd';
// import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import { getTodoList } from '@/services/api-work';
import { getDepartmentList } from '@/services/api-department';

// const { Option } = Select;
const DepartmentAudit: React.FC = () => {
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  // const [currentRow, setCurrentRowData] = useState<Record<string, any>>({});
  const [statusValue, changeStatus] = useState<number>(2);
  // const [currentDep, changeDepartment] = useState<number>(2);
  const onChangeStatus = (e: any) => {
    changeStatus(e.target.value);
  };
  // const handleChangeDepartment = (value: any) => {
  //   changeDepartment(value)
  // }
  // const setCurrentRow = async (rowdata: Record<string, any>): Promise<void> => {
  const setCurrentRow = async (): Promise<void> => {
    setHandleUpdate(true);
    // setCurrentRowData(rowdata);

    await getDepartmentList(1, 100, '');
  };
  type tableParamsType = {
    keyword: string;
    current: number;
    pageSize: number;
  };
  const tableParams: tableParamsType = {
    keyword: '',
    current: 1,
    pageSize: 20,
  };
  // const auditList = async (params: tableParamsType | any) => {
  const auditList = async () => {
    let data: any = {};
    await getTodoList().then((res) => {
      data = {
        success: true,
        data: res.data,
      };
    });
    return data;
  };
  const columns: Record<string, any>[] = [
    {
      dataIndex: 'name',
      title: '事件',
    },
    {
      dataIndex: 'createrAccount',
      title: '账号',
    },
    {
      dataIndex: 'createrNickName',
      title: '申请人',
    },
    {
      dataIndex: 'createDate',
      title: '申请时间',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '通过',
          status: 'Success',
        },
        3: {
          text: '拒绝',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: (record: Record<string, any>) => {
        return [
          <a
            key="edit"
            onClick={() => {
              setCurrentRow(record);
            }}
          >
            审核
          </a>,
        ];
      },
    },
  ];
  return (
    <>
      <PageContainer>
        <Card>
          <ProTable<API.OrganizationDetails>
            columns={columns}
            request={auditList}
            rowKey="id"
            params={tableParams}
            pagination={{
              showQuickJumper: false,
            }}
            search={false}
          />
        </Card>
        <ModalForm<{
          name: string;
          company: string;
        }>
          title="审核列表"
          visible={updateVisible}
          modalProps={{
            onCancel: () => setHandleUpdate(false),
          }}
          onFinish={async () => {
            message.success('提交成功');
            return true;
          }}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="审核状态">
              <Radio.Group onChange={onChangeStatus} value={statusValue}>
                <Radio value={2}>同意</Radio>
                <Radio value={3}>拒绝</Radio>
              </Radio.Group>
            </Descriptions.Item>
            <Descriptions.Item label="分配部门">
              {/* <Select value={currentDep} style={{ width: 120 }} onChange={handleChangeDepartment}>
                <Option value="jack">Jack</Option>

              </Select> */}
            </Descriptions.Item>
          </Descriptions>
        </ModalForm>
      </PageContainer>
    </>
  );
};
export default DepartmentAudit;
