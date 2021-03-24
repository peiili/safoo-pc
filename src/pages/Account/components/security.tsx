import { Form, List, message } from 'antd';
import React, { Fragment, useState } from 'react';
import { useModel } from 'umi';
import { getAuthCode, updatePassword } from '@/services/api-user';
import { ProFormText, ModalForm, ProFormCaptcha } from '@ant-design/pro-form';

const Security: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [showModel, setShowModel] = useState<boolean>();
  const setHandleUpdate = () => {
    setShowModel(true);
  };
  const getCode = (phone: string) => {
    console.log(phone);
    return getAuthCode(phone).then((res) => {
      form.setFieldsValue({
        authCode: res.data,
      });
    });
  };
  const motifyPassword = (values: LOGIN.rePassword) => {
    console.log(values);

    updatePassword(values).then(async (res) => {
      message.success(res.data);
    });
  };
  const getData = [
    {
      title: '账户密码',
      description: '',
      actions: [
        <a
          href="#"
          onClick={() => {
            setHandleUpdate();
          }}
        >
          修改密码
        </a>,
      ],
    },
  ];
  return (
    <>
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={getData}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
      <ModalForm<LOGIN.rePassword>
        title="修改密码"
        visible={showModel}
        form={form}
        modalProps={{
          onCancel: () => setShowModel(false),
        }}
        onFinish={async (values) => {
          await motifyPassword(values);
          message.success('提交成功');
        }}
        initialValues={{
          telephone: currentUser?.phone,
        }}
      >
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          name="telephone"
          label="账号"
          bordered={false}
          disabled={true}
          placeholder="请输入手机号"
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
          }}
          captchaProps={{
            size: 'large',
          }}
          phoneName="telephone"
          name="authCode"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          placeholder="请输入验证码"
          onGetCaptcha={async (phone) => {
            await getCode(phone);
            message.success(`手机号 ${phone} 验证码发送成功!`);
          }}
        />
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          name="password"
          label="新密码"
          placeholder="请输入新密码"
        />
      </ModalForm>
    </>
  );
};
export default Security;
