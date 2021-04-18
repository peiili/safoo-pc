import React, { useState, useRef } from 'react';
import { getBindDeviceList } from '@/services/api-device';
import { Button, Card, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'umi';
import { bindDevice } from '@/services/api-device';
import Details from './../Details/index';

// 获取绑定列表
const deviceList = async (params: any) => {
  let data: any = {};
  await getBindDeviceList(params.current, params.pageSize, params.keyword).then((res) => {
    data = {
      success: true,
      data: res.data?.list || [],
      total: res.data?.total || 0,
    };
  });
  return data;
};

const handleAdd = async (obj: DEVICE.bindDevice) => {
  const hide = message.loading('正在绑定');
  const res = await bindDevice(obj.code);
  hide();
  if (res.code === 200) {
    message.success('绑定成功');
    return true;
  }
  message.error('绑定失败请重试！');
  return false;
};

const Devices: React.FC = () => {
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);
  const [currentId, setCurrentRowId] = useState<string>('');
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const setCurrentRow = async (id: string) => {
    await setCurrentRowId(id);
  };

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
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key="edit"
            onClick={async () => {
              if (record.isOnline) {
                setHandleUpdate(true);
                setCurrentRow(record.deviceId);
              }
            }}
            style={{ color: record.isOnline ? '' : '#ccc' }}
          >
            详情
          </a>,
        ];
      },
    },
  ];

  return (
    <>
      <PageContainer>
        {!updateVisible ? (
          <Card>
            <ProTable<API.DevicesList>
              actionRef={actionRef}
              columns={columns}
              request={deviceList}
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
                  <PlusOutlined />{' '}
                  <FormattedMessage id="pages.searchTable.addDevice" defaultMessage="添加柜机" />
                </Button>,
              ]}
              search={false}
            />
          </Card>
        ) : (
          <Details id={currentId} />
        )}
      </PageContainer>
      <ModalForm<DEVICE.bindDevice>
        title={intl.formatMessage({
          id: 'pages.searchTable.addDevice',
          defaultMessage: '添加柜机',
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
          label="柜机码"
          rules={[
            {
              required: true,
              message: '柜机码不能为空',
            },
          ]}
          width="md"
          name="code"
        />
      </ModalForm>
    </>
  );
};
export default Devices;
