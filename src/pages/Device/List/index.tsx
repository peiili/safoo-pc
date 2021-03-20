import { getBindDeviceList } from '@/services/api-device';
import { Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi';

// // 获取绑定列表
const deviceList = async (params: any) => {
  let data: any = {};
  await getBindDeviceList(params.current, params.pageSize, params.keyword).then((res) => {
    data = {
      success: true,
      data: res.data.list,
      total: res.data.total,
    };
  });
  return data;
};
const Devices: React.FC = () => {
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
            详情
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
          request={deviceList}
          rowKey="code"
          pagination={{
            showQuickJumper: false,
          }}
          toolBarRender={false}
          search={false}
        />
      </Card>
    </PageContainer>
  );
};
export default Devices;
