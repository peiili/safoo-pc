import { Card, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Install from './components/Install/index';
import Maintain from './components/Maintain/index';
import Repair from './components/Repair/index';
import Production from './components/Production/index';
import { useIntl } from 'umi';

const { TabPane } = Tabs;
function callback(key: string) {
  console.log(key);
}
const Service: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageContainer>
        <Card>
          <Tabs defaultActiveKey="production" onChange={callback}>
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.service.production',
                defaultMessage: '生产调试',
              })}
              key="production"
            >
              <Production></Production>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.service.install',
                defaultMessage: '安装调试',
              })}
              key="install"
            >
              <Install></Install>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.service.repair',
                defaultMessage: '设备维修',
              })}
              key="repair"
            >
              <Repair></Repair>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.service.maintain',
                defaultMessage: '设备维保',
              })}
              key="maintain"
            >
              <Maintain></Maintain>
            </TabPane>
          </Tabs>
        </Card>
      </PageContainer>
    </>
  );
};
export default Service;
