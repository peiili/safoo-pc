import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { getDeviceStockInfo } from '@/services/api-device';
import { Empty, List, Row, Col } from 'antd';

type list = {
  name: string;
  pcs: number;
};
const Goods: React.FC<{ id: string }> = (props) => {
  const [lists, setGoodsList] = useState<list[]>([]);
  const [loading, showLoad] = useState<boolean>(true);
  useEffect(() => {
    getDeviceStockInfo(props.id).then((res) => {
      setGoodsList(res.data);
      showLoad(false);
    });
  }, [props.id]);

  return (
    <>
      <ProCard title="物品" loading={loading}>
        <div style={{ height: '300px', overflow: 'auto' }}>
          {lists.length ? (
            <List<list>
              bordered
              dataSource={lists}
              renderItem={(item, i) => (
                <List.Item>
                  <Row style={{ width: '100%' }} key={i} justify="space-between">
                    <Col>{item.name}</Col>
                    <Col>{item.pcs}&nbsp;pcs</Col>
                  </Row>
                </List.Item>
              )}
            />
          ) : (
            <Empty />
          )}
        </div>
      </ProCard>
    </>
  );
};
export default Goods;
