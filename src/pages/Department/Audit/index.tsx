import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Radio, Card, Descriptions, message } from 'antd';
// import type { ProColumns } from '@ant-design/pro-table';
import DepartmentSelect from './departmentOption';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import { auditApply, getTodoList } from '@/services/api-work';
// import { getDepartmentList } from '@/services/api-department';

const DepartmentAudit: React.FC = () => {
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  const [currentRow, setCurrentRowData] = useState<Record<string, any>>({});
  const [statusValue, changeStatus] = useState<2 | 3>(2);
  const [distributionDep, setDistributionDep] = useState<string>('');

  const onChangeStatus = (e: any) => {
    changeStatus(e.target.value);
  };

  const distributionTo = (data: string) => {
    setDistributionDep(data);
  };
  const setCurrentRow = async (rowData: Record<string, any>): Promise<void> => {
    // const setCurrentRow = async (): Promise<void> => {
    setHandleUpdate(true);
    setCurrentRowData(rowData);
    // await getDepartmentList(1, 100, '');
  };
  const applyAudit = () => {
    return auditApply({
      cause: '',
      departmentId: distributionDep,
      endTime: '',
      flowItemId: currentRow.id,
      status: statusValue,
    });
  };
  const tableParams: DepType.tableParamsType = {
    keyword: '',
    current: 1,
    pageSize: 20,
  };
  const auditList = async () => {
    // const auditList = async (params: tableParamsType | any) => {
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
          text: '待审核',
          status: 'Processing',
        },
        2: {
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
      render: (_: any, record: Record<string, any>) => {
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
            await applyAudit();
            message.success('提交成功');
            setHandleUpdate(false);
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
              <DepartmentSelect
                id={currentRow.id}
                cb={(value: string) => distributionTo(value)}
              ></DepartmentSelect>
            </Descriptions.Item>
          </Descriptions>
        </ModalForm>
      </PageContainer>
    </>
  );
};
export default DepartmentAudit;
