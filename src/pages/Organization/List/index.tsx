import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { Access, useIntl, FormattedMessage, useModel } from 'umi';
import { getProvince, getArea, getCity } from '@/services/api-common';

import {
  createOrganization,
  getOrganizationList,
  delOrganization,
} from '@/services/api-organization';
import OrgDetails from '@/pages/Organization/Details/index';
import OrgUpdate from '@/pages/Organization/Update/index';

const handleAdd = async (fields: ORGTYPE.create) => {
  const hide = message.loading('正在添加');
  const res = await createOrganization({ ...fields });
  hide();
  if (res.code === 200) {
    message.success('添加成功');
    return true;
  }
  message.error('添加失败请重试！');
  return false;
};

const organizationList = async (params: any) => {
  let data: any = {};
  const res = await getOrganizationList(params.keyword, params.current, params.pageSize);
  if (res.code === 200) {
    data = {
      success: true,
      data: res.data.list,
      total: res.data.total,
    };
  }
  return data;
};

const OrganizationList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const [currentId, setCurrentId] = useState<string>('');
  const [updateVisible, setHandleUpdate] = useState<boolean>(false);

  /** 更新信息 */
  const [currentRow, setDetails] = useState<any>({});
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  /** 省市区 */
  const [provinceList, setProvinceList] = useState<any>({});
  const [cityList, setCityList] = useState<any>({});
  const [areaList, setAreaList] = useState<any>({});
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /** 国际化配置 */
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const setCurrentRow = async (id: string): Promise<void> => {
    setCurrentId(id);
  };
  const setUpdate = (row: any) => {
    setShowUpdate(true);
    setDetails(row);
  };

  /** 获取省份 */
  const getPocinceList = async () => {
    const res = await getProvince();
    const obj: Record<string, any> = {};
    res.data.forEach((e) => {
      obj[e.areaCode] = e.areaName;
    });
    setProvinceList(obj);
  };

  /** 获取城市 */
  const getCityList = async (event: string) => {
    const res = await getCity(event);
    const obj: Record<string, any> = {};
    res.data.forEach((e) => {
      obj[e.areaCode] = e.areaName;
    });
    setCityList(obj);
  };
  /** 获取区域 */
  const getAreaList = async (event: string) => {
    const res = await getArea(event);
    const obj: Record<string, any> = {};
    res.data.forEach((e) => {
      obj[e.areaCode] = e.areaName;
    });
    setAreaList(obj);
  };

  const handleFormValue = (_: any) => {
    if (Object.keys(_).includes('provinceName')) {
      getCityList(_.provinceName);
    } else if (Object.keys(_).includes('cityName')) {
      getAreaList(_.cityName);
    }
  };
  useEffect(() => {
    getPocinceList();
  }, []);

  const delOrg = (id: string) => {
    return delOrganization(id);
  };

  const columns: ProColumns<API.OrganizationDetails>[] = [
    {
      dataIndex: 'code',
      title: '机构码',
    },
    {
      dataIndex: 'name',
      title: '机构名称',
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
          <a
            key="update"
            onClick={() => {
              setUpdate(record);
            }}
          >
            更新
          </a>,
          <Access
            key="del"
            accessible={currentUser?.roleType ? [2, 3].includes(currentUser?.roleType) : false}
          >
            <Popconfirm
              title="是否删除当前机构"
              onConfirm={async () => {
                const success = await delOrg(record.id);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
              onCancel={() => false}
              okText="是"
              cancelText="否"
            >
              <a href="#" style={{ color: 'red' }}>
                删除
              </a>
            </Popconfirm>
          </Access>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <Card style={{ display: updateVisible ? 'none' : 'block' }}>
        <ProTable<API.OrganizationDetails>
          columns={columns}
          actionRef={actionRef}
          request={organizationList}
          rowKey="code"
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
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
          ]}
          search={false}
        />
      </Card>
      {updateVisible && <OrgDetails id={currentId} handle={() => setHandleUpdate(false)} />}

      <OrgUpdate
        show={showUpdate}
        currentRow={currentRow}
        handle={(vis: boolean) => setShowUpdate(vis)}
        ok={() => actionRef.current && actionRef.current.reload()}
      />
      <ModalForm<ORGTYPE.create>
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newOrg',
          defaultMessage: '新建机构',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onValuesChange={(_) => {
          handleFormValue(_);
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          handleModalVisible(false);
        }}
      >
        <ProFormText
          label="机构名称"
          rules={[
            {
              required: true,
              message: '机构名称不能为空',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          label="机构代码"
          rules={[
            {
              required: true,
              message: '机构代码不能为空',
            },
          ]}
          width="md"
          name="code"
        />
        <ProFormSelect
          name="provinceName"
          label="省份"
          valueEnum={provinceList}
          placeholder="请选择所在省份"
          rules={[{ required: true, message: '请选择所在省份!' }]}
        />
        <ProFormSelect
          name="cityName"
          label="城市"
          valueEnum={cityList}
          placeholder="请选择一个城市"
          rules={[{ required: true, message: '请选择城市！' }]}
        />
        <ProFormSelect
          name="areaName"
          label="区域"
          valueEnum={areaList}
          placeholder="请选择一个区域"
        />
        <ProFormTextArea label="机构地址" width="md" name="address" />
      </ModalForm>
    </PageContainer>
  );
};

export default OrganizationList;
