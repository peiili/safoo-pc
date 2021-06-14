import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { getFileList, uploadFile, deleteFile } from '@/services/api-file';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormSelect, ProFormUploadButton } from '@ant-design/pro-form';
import { Button, Card, message } from 'antd';
import { translateEnums } from '@/utils/enums';
import { useModel } from 'umi';

const Download: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  type fileBasic = {
    id: string;
    dataIndex: string;
    fileKey: string;
    title: string;
    size: number;
    type: number;
    valueType?: string;
    url: string;
    name: string;
    render?: () => void;
  };
  let fileData: any;
  const onChangeFile = (file: any) => {
    if (file.file.status === 'done') {
      fileData = file.file.originFileObj;
    }
  };

  const handleModalVisible = () => {
    return (
      <ModalForm<{
        name: string;
        type: number;
        upload: any;
      }>
        formRef={formRef}
        initialValues={{
          type: 0,
        }}
        title="文件上传"
        trigger={
          <Button type="primary" key="primary">
            <PlusOutlined />
            上传文件
          </Button>
        }
        modalProps={{
          onCancel: () => formRef.current?.resetFields(),
        }}
        onFinish={async (values) => {
          if (!fileData) {
            message.warning('请等待文件上传完成');
            return false;
          }
          const { type } = values;
          const formData = new FormData();
          formData.append('type', type.toString());
          formData.append('file', fileData);
          const res = await uploadFile(formData);
          if (res.code === 200) {
            if (actionRef.current) {
              actionRef.current.reload();
            }
            message.success('提交成功');
          }
          return true;
        }}
      >
        {/* <ProFormText width="xl" name="name" label="文件名称(不填写时默认使用文件名称)" /> */}
        <ProForm.Group>
          <ProFormSelect
            allowClear={false}
            options={[
              {
                value: 0,
                label: translateEnums('fileType', 0),
              },
            ]}
            width="xl"
            name="type"
            label="文件分类"
          />
        </ProForm.Group>
        <ProFormUploadButton
          name="upload"
          max={1}
          fieldProps={{
            name: 'file',
          }}
          onChange={onChangeFile}
        />
      </ModalForm>
    );
  };
  const deleteItem = (fileKey: string) => {
    deleteFile(fileKey).then((e) => {
      if (e.code === 200) {
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    });
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
      render: (_, record) => {
        return [translateEnums('fileType', record.type)];
      },
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
          <a key="download" download={record.name} href={record.url} target="_blank">
            下载
          </a>,
          <span key="delete">
            {currentUser?.roleType === 2 && (
              <a style={{ color: 'red' }} onClick={(): void => deleteItem(record.fileKey)}>
                删除
              </a>
            )}
          </span>,
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
  return (
    <>
      <PageContainer>
        <Card>
          <ProTable<fileBasic>
            columns={columns}
            actionRef={actionRef}
            request={fileList}
            rowKey="fileKey"
            pagination={{
              showQuickJumper: false,
            }}
            search={false}
            toolBarRender={() => [
              <div key="create">{currentUser?.roleType === 2 ? handleModalVisible() : ''}</div>,
            ]}
          />
        </Card>
      </PageContainer>
    </>
  );
};
export default Download;
