import { Descriptions } from 'antd';
import { useModel } from 'umi';
import { translateEnums } from '@/utils/enums';

const Base: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <>
      <Descriptions title="基本信息" column={1} bordered labelStyle={{ width: '200px' }}>
        <Descriptions.Item label="姓名">{currentUser?.nickname}</Descriptions.Item>
        <Descriptions.Item label="账号">{currentUser?.username}</Descriptions.Item>
        <Descriptions.Item label="电话">{currentUser?.phone}</Descriptions.Item>
        <Descriptions.Item label="身份">
          {currentUser?.roleType
            ? translateEnums('roles', currentUser?.roleType)
            : currentUser?.roleType}
        </Descriptions.Item>
        <Descriptions.Item label="所属机构">{currentUser?.organizationName}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default Base;
