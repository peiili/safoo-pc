import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { getFileList } from '@/services/api-file';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Card } from 'antd';

type fileBasic = {
  dataIndex: string;
  title: string;
  size: number;
  valueType?: string;
  url: string;
  name: string;
  render?: () => void;
};

const columns: ProColumns<fileBasic>[] = [
  {
    dataIndex: 'name',
    title: '文件名',
  },
  {
    dataIndex: 'size',
    title: '大小',
    render: (_, record) => {
      return [
        record.size / 1000 / 1000 >= 1 ? (
          <p>{(record.size / 1000 / 1000).toFixed(2)}M</p>
        ) : (
          <p>{(record.size / 1000).toFixed(2)}KB</p>
        ),
      ];
    },
  },
  {
    dataIndex: 'type',
    title: '类型',
  },
  {
    dataIndex: 'uploadTime',
    title: '更新时间',
  },
  {
    title: '操作',
    dataIndex: '',
    valueType: 'option',
    render: (_, record) => {
      return [
        <a key="download" download={record.name} href={record.url}>
          下载
        </a>,
      ];
    },
  },
];
// 获取绑定列表
const fileList = async () => {
  let data: any = {};
  await getFileList('0').then((res) => {
    if (res.code === 200 && res.data.length > 0) {
      data = {
        success: true,
        data: res.data || [],
        total: res.data.length,
      };
    }
  });
  return data;
};
const Download: React.FC = () => {
  return (
    <>
      <PageContainer>
        <Card>
          <ProTable<fileBasic>
            columns={columns}
            request={fileList}
            rowKey="name"
            pagination={{
              showQuickJumper: false,
            }}
            search={false}
          />
        </Card>
      </PageContainer>
    </>
  );
};
export default Download;
