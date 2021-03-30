import { ModalForm, ProFormText } from '@ant-design/pro-form';
// import { message } from 'antd';
// import { updateOrganization } from '@/services/api-organization';
import { useIntl } from 'umi';

const handleFormValue = (_: any) => {
  if (Object.keys(_).includes('provinceName')) {
    // getCityList(_.provinceName);
  } else if (Object.keys(_).includes('cityName')) {
    // getAreaList(_.cityName);
  }
};
// const handleAdd = async (fields: ORGTYPE.create) => {
//   const hide = message.loading('正在添加');
//   const res = await updateOrganization({ ...fields });
//   hide();
//   if (res.code === 200) {
//     message.success('添加成功');
//     return true;
//   }
//   message.error('添加失败请重试！');
//   return false;
// };
interface OrgUpdateType {
  show: boolean;
  currentRow: API.OrganizationDetails;
  handle: () => void;
}
const OrgUpdate: React.FC<OrgUpdateType> = (props) => {
  const intl = useIntl();
  console.log(props.currentRow.name);
  return (
    <>
      <ModalForm<ORGTYPE.update>
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateOrg',
          defaultMessage: '更新机构',
        })}
        width="400px"
        visible={props.show}
        onVisibleChange={props.handle}
        onValuesChange={(_) => {
          handleFormValue(_);
        }}
        initialValues={{
          name: props.currentRow.name,
          code: '123132',
        }}
        onFinish={async () => {
          // const success = await handleAdd(value);
          // if (success) {
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
          props.handle();
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
