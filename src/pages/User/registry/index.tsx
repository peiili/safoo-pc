import React, { useState } from 'react';
import { ProFormText, ModalForm, ProFormCaptcha } from '@ant-design/pro-form';
import { message } from 'antd';
import { getAuthCode, userRegister } from '@/services/api-user';
// import { MobileOutlined, MailOutlined } from '@ant-design/icons';
// import { Link } from 'umi';
// import styles from './index.less';

const Registry: React.FC<{ showRegisterModel: boolean; setRegister: Function }> = (props) => {
  const [authCode, setAuthCode] = useState<string>();
  const getCode = (phone: string) => {
    return getAuthCode(phone).then((res) => {
      setAuthCode(res.data);
    });
  };

  const submitRegistry = (object: LOGIN.registryForm) => {
    return userRegister(object).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div>
        <ModalForm<LOGIN.registryForm>
          title="注册账户"
          visible={props.showRegisterModel}
          modalProps={{
            onCancel: () => props.setRegister(false),
          }}
          onFinish={async (values) => {
            await submitRegistry(values);
            message.success('提交成功');
          }}
        >
          <ProFormText
            fieldProps={{
              size: 'large',
            }}
            name="username"
            placeholder="请输入姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          />
          <ProFormText
            fieldProps={{
              size: 'large',
            }}
            name="telephone"
            placeholder="请输入手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              {
                pattern: /^1\d{10}$/,
                message: '不合法的手机号格式!',
              },
            ]}
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
            value={authCode}
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
            name="organizationCode"
            placeholder="机构代码"
            rules={[
              {
                required: true,
                message: '请输入机构代码！',
              },
            ]}
          />
          <ProFormText
            fieldProps={{
              size: 'large',
            }}
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ProFormText
            fieldProps={{
              size: 'large',
            }}
            name="rePassword"
            placeholder="确认密码"
            rules={[
              {
                required: true,
                message: '请再一次输入密码！',
              },
            ]}
          />
        </ModalForm>
      </div>
    </>
  );
};
export default Registry;
