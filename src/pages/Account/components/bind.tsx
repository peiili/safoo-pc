import { List, Popconfirm, message } from 'antd';
import React, { Fragment } from 'react';
import { useModel } from 'umi';
import { WechatFilled } from '@ant-design/icons';
import { ubBindWX } from '@/services/api-wx';

const Bind: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const unbind = () => {
    if (currentUser?.wxUnionid) {
      ubBindWX(currentUser.wxUnionid).then(async (res) => {
        message.success(res.data);
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
          setInitialState({
            ...initialState,
            currentUser: userInfo,
          });
        }
      });
    }
  };
  const cancel = (): void => {};
  const getData = [
    {
      title: '绑定微信',
      description: '已绑定微信',
      actions: [
        <Popconfirm
          title="是否确定解除微信绑定，解除后您将无法接收平台推送消息"
          onConfirm={unbind}
          onCancel={cancel}
          okText="是"
          cancelText="否"
          key="ubBind"
        >
          <a href="#">解绑</a>
        </Popconfirm>,
      ],
      avatar: <WechatFilled style={{ color: 'lightGreen', fontSize: '48px' }} />,
    },
  ];
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
export default Bind;
