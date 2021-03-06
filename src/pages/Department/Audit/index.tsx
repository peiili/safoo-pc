import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Radio, Card, Descriptions, Form, Input, message } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import DepartmentSelect from './departmentOption';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormDateTimePicker } from '@ant-design/pro-form';
import { auditApply, getTodoList } from '@/services/api-work';
import moment from 'moment';
// import { getDepartmentList } from '@/services/api-department';

const { TextArea } = Input;
const DepartmentAudit: React.FC = () => {
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  const [currentRow, setCurrentRowData] = useState<Record<string, any>>({});
  const [statusValue, changeStatus] = useState<2 | 3>(2);
  const [distributionDep, setDistributionDep] = useState<string>('');
  const [rejectCause, onSetCause] = useState<string>('');
  const actionRef = useRef<ActionType>();

  const initAuditData = () => {
    changeStatus(2);
    setDistributionDep('');
    onSetCause('');
  };
  // const onChangeCause = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   onSetCause(e.target.value);
  // };
  const onChangeStatus = (e: any) => {
    changeStatus(e.target.value);
  };

  const distributionTo = (data: string) => {
    setDistributionDep(data);
  };
  const setCurrentRow = async (rowData: Record<string, any>): Promise<void> => {
    setHandleUpdate(true);
    setCurrentRowData(rowData);
  };
  const applyAudit = (values: Record<string, any>) => {
    return auditApply({
      cause: statusValue === 3 ? values.rejectCause : '',
      departmentId: statusValue === 2 && currentRow.type === 1 ? distributionDep : '',
      endTime:
        statusValue === 2 && currentRow.type === 2
          ? moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')
          : '',
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
      title: '??????',
    },
    {
      dataIndex: 'createrAccount',
      title: '??????',
    },
    {
      dataIndex: 'createrNickName',
      title: '?????????',
    },
    {
      dataIndex: 'createDate',
      title: '????????????',
    },
    {
      title: '????????????',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '?????????',
          status: 'Processing',
        },
        2: {
          text: '??????',
          status: 'Success',
        },
        3: {
          text: '??????',
          status: 'Error',
        },
      },
    },
    {
      title: '??????',
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
            ??????
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
            actionRef={actionRef}
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
          endTime: number;
          status: number;
          rejectCause: string;
          departmentId: string;
        }>
          initialValues={{
            endTime: Date.now() + 1000 * 60 * 10,
            status: statusValue,
            rejectCause,
            departmentId: '',
          }}
          title="????????????"
          visible={updateVisible}
          modalProps={{
            onCancel: () => setHandleUpdate(false),
          }}
          onFinish={async (values: any) => {
            await applyAudit(values);
            message.success('????????????');
            setHandleUpdate(false);
            initAuditData();
            if (actionRef.current) {
              actionRef.current.reload();
            }
            return true;
          }}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="????????????">
              <Form.Item name="status">
                <Radio.Group onChange={onChangeStatus} value={statusValue}>
                  <Radio value={2}>??????</Radio>
                  <Radio value={3}>??????</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            {currentRow.type === 1 ? (
              <Descriptions.Item label="????????????">
                {statusValue === 2 ? (
                  <Form.Item name="departmentId">
                    <DepartmentSelect
                      id={currentRow.id}
                      cb={(value: string) => distributionTo(value)}
                    ></DepartmentSelect>
                  </Form.Item>
                ) : (
                  <Form.Item name="rejectCause">
                    <TextArea rows={4} />
                  </Form.Item>
                )}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="???????????????">
                {statusValue === 2 ? (
                  <ProFormDateTimePicker name="endTime" />
                ) : (
                  <Form.Item name="rejectCause">
                    <TextArea rows={4} />
                  </Form.Item>
                )}
              </Descriptions.Item>
            )}
          </Descriptions>
        </ModalForm>
      </PageContainer>
    </>
  );
};
export default DepartmentAudit;
