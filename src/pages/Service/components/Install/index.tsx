import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getSetupList } from '@/services/api-support';
import { Button, Descriptions } from 'antd';
import { ModalForm } from '@ant-design/pro-form';

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
const Install: React.FC = () => {
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
  const setCurrentRow = (data: any): void => {
    setupShowDetails(true);
    setDetails(data);
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
        request={chargeList}
        rowKey="deviceId"
        pagination={{
          showQuickJumper: false,
        }}
        toolBarRender={false}
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
    </>
  );
};
export default Install;
