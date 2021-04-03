import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { updateOrganization } from '@/services/api-organization';
import { useIntl } from 'umi';

interface OrgUpdateType {
  show: boolean;
  currentRow: API.OrganizationDetails;
  handle: (arg0: boolean) => void;
  ok: () => void;
}
const OrgUpdate: React.FC<OrgUpdateType> = (props) => {
  const [newForm] = Form.useForm();
  const intl = useIntl();
  setTimeout(() => {
    newForm.setFieldsValue({
      name: props.currentRow.name,
      code: props.currentRow.code,
    });
  }, 100);

  const handleAdd = async (fields: ORGTYPE.update) => {
    const hide = message.loading('正在添加');
    const res = await updateOrganization({ ...fields, id: props.currentRow.id });
    hide();
    if (res.code === 200) {
      message.success('更新成功');
      return true;
    }
    message.error('更新失败请重试！');
    return false;
  };
  return (
    <>
      <ModalForm<ORGTYPE.update>
        form={newForm}
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateOrg',
          defaultMessage: '更新机构',
        })}
        width="400px"
        visible={props.show}
        onVisibleChange={props.handle}
        onFinish={async (values) => {
          const success = await handleAdd(values);
          if (success) {
            props.handle(false);
            props.ok();
          }
        }}
      >
        <ProFormText
          label="机构名称"
          rules={[
            {
              required: true,
              message: '部门名称不能为空',
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
      </ModalForm>
    </>
  );
};
export default OrgUpdate;
