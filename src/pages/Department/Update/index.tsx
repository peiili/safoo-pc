import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { updateDepartment } from '@/services/api-department';
import { useIntl } from 'umi';

interface OrgUpdateType {
  show: boolean;
  currentRow: DepType.updateDep;
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
      description: props.currentRow.description,
    });
  }, 100);

  const handleAdd = async (fields: DepType.updateDep) => {
    const hide = message.loading('正在添加');
    const res = await updateDepartment({ ...fields, id: props.currentRow.id });
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
      <ModalForm<DepType.updateDep>
        form={newForm}
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateOrg',
          defaultMessage: '更新部门',
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
          label="部门名称"
          rules={[
            {
              required: true,
              message: '部门名称不能为空',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText label="部门代码" width="md" name="code" />
        <ProFormTextArea label="部门描述" width="md" name="description" />
      </ModalForm>
    </>
  );
};
export default OrgUpdate;
