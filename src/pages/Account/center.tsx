import React, { useState } from 'React';
import { Layout, Menu } from 'antd';
import Base from './components/base';
import Bind from './components/bind';
import Security from './components/security';
import style from './index.less';

const { Content, Sider } = Layout;
type pageType = 'base' | 'bind' | 'security';
const UserCenter: React.FC = () => {
  const [pageType, setPageType] = useState<pageType>();
  const currentContent = () => {
    switch (pageType) {
      case 'base':
        return <Base></Base>;
      case 'bind':
        return <Bind></Bind>;
      case 'security':
        return <Security></Security>;
      default:
        return <Base></Base>;
    }
  };
  const handleClick = (e: any) => {
    setPageType(e.key);
  };
  return (
    <Layout
      className={style['site-layout-background']}
      style={{ padding: '24px 0', minHeight: 'auto' }}
    >
      <Sider className={style['site-layout-background']} width={200}>
        <Menu
          onClick={handleClick}
          mode="inline"
          defaultSelectedKeys={['base']}
          style={{ height: '100%' }}
        >
          <Menu.Item key="base">基本信息</Menu.Item>
          <Menu.Item key="bind">绑定信息</Menu.Item>
          <Menu.Item key="security">安全信息</Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>{currentContent()}</Content>
    </Layout>
  );
};
export default UserCenter;
