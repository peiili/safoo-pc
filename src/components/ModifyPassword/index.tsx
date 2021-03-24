import React from 'react';
import { ProFormText, ModalForm, ProFormCaptcha } from '@ant-design/pro-form';
import { useModel } from 'umi';
import { getAuthCode, updatePassword } from '@/services/api-user';
import { Form, message } from 'antd';

const ModifyPassword: React.FC<{ show: boolean; toggleShow: () => void; atLogin: boolean }> = (
  props
) => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const getCode = (phone: string) => {
    console.log(phone);
    return getAuthCode(phone).then((res) => {
      form.setFieldsValue({
        authCode: res.data,
      });
    });
  };
  const modifyPassword = (values: LOGIN.rePassword) => {
    updatePassword(values).then(async (res) => {
      props.toggleShow();
      message.success(res.data);
    });
  };
  return (
    <>
      <ModalForm<LOGIN.rePassword>
        title="修改密码"
        visible={props.show}
        form={form}
        modalProps={{
          onCancel: () => props.toggleShow(),
        }}
        onFinish={async (values) => {
          await modifyPassword(values);
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
          disabled={!props.atLogin}
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
export default ModifyPassword;
