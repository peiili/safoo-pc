import React, { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PageHeader, Descriptions } from 'antd';
import { FormattedMessage } from 'umi';
import { getOrganizationDetails } from '@/services/api-organization';
import { getBindDeviceList } from '@/services/api-device';

type PropsType = {
  id: string;
  handle: () => void;
};
const OrgDetails: React.FC<PropsType> = (props) => {
  const actionRef = useRef<ActionType>();

  // 获取绑定列表
  const deviceList = async (params: any) => {
    let data: any = {};
    await getBindDeviceList(params.current, params.pageSize, props.id).then((res) => {
      data = {
        success: true,
        data: res.data.list,
        total: res.data.total,
      };
    });
    return data;
  };
  const [currentRow, setCurrentRowData] = useState<API.OrganizationDetails>({});
  const setCurrentRow = async (id: string): Promise<void> => {
    await getOrganizationDetails(id).then((res) => {
      setCurrentRowData(res.data);
    });
  };
  useEffect(() => {
    setCurrentRow(props.id);
  }, [props.id]);
  const columns: ProColumns<API.DevicesList>[] = [
    {
      dataIndex: 'deviceId',
      title: 'ID',
    },
    {
      dataIndex: 'name',
      title: '设备名称',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="状态" />,
      dataIndex: 'isOnline',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.offline" defaultMessage="离线" />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="运行中" />
          ),
          status: 'Processing',
        },
      },
    },
    {
      dataIndex: 'address',
      title: '地址',
    },
  ];
  return (
    <>
      <ProCard gutter={[0, 16]} direction="column" ghost>
        <PageHeader onBack={() => props.handle()} title="返回" />
        <ProCard direction="column" ghost>
          <ProCard title="机构详情" headerBordered>
            <Descriptions>
              <Descriptions.Item label="机构码">{currentRow.code}</Descriptions.Item>
              <Descriptions.Item label="机构名称">{currentRow.name}</Descriptions.Item>
              <Descriptions.Item label="负责人">{currentRow.mgrUserName}</Descriptions.Item>
              <Descriptions.Item label="手机号">{currentRow.mgrUserPhone}</Descriptions.Item>
              <Descriptions.Item label="销售人员">{currentRow.saleUserId}</Descriptions.Item>
              <Descriptions.Item label="技术支持">{currentRow.techUserName}</Descriptions.Item>
              <Descriptions.Item label="客服人员">{currentRow.srvUserName}</Descriptions.Item>
            </Descriptions>
          </ProCard>
          <ProTable<API.DevicesList>
            actionRef={actionRef}
            columns={columns}
            request={deviceList}
            rowKey="deviceId"
            headerTitle="设备列表"
            pagination={{
              showQuickJumper: false,
            }}
            toolBarRender={() => []}
            search={false}
          />
        </ProCard>
      </ProCard>
    </>
  );
};
export default OrgDetails;
