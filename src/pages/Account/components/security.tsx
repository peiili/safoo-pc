import { List } from 'antd';
import React, { Fragment, useState } from 'react';
import ModifyPassword from '@/components/ModifyPassword/index';

const Security: React.FC = () => {
  const [showModel, setShowModel] = useState<boolean>();
  const setHandleUpdate = () => {
    setShowModel(true);
  };
  const getData = [
    {
      title: '账户密码',
      description: '',
      actions: [
        <a
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
      <ModifyPassword
        show={Boolean(showModel)}
        toggleShow={() => setShowModel(false)}
        atLogin={false}
      />
    </Fragment>
  );
};
export default Security;
