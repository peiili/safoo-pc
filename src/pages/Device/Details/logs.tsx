import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { getDeviceLog } from '@/services/api-device';
import { Empty, List, Row, Col } from 'antd';

const alarmTypeEnums = function (type: number | string): string {
  const enums = {
    0: '温度过高',
    1: '温度过低',
    2: '湿度过高',
    3: '湿度过低',
    4: 'VOC1浓度过高',
    5: 'VOC2浓度过高',
    6: 'SIM卡流量预警',
  };
  return enums[type];
};
const LogList = (lists: DEVICE.deviceLogs[]) => {
  return (
    <div style={{ height: '300px', overflow: 'auto' }}>
      {lists.length ? (
        <List
          bordered
          dataSource={lists}
          renderItem={(item) => (
            <List.Item>
              <Row style={{ width: '100%' }} key={item.number} justify="space-between">
                <Col span={15}>
                  <div>
                    <div className="time">
                      <span>{item.time}</span>
                    </div>
                    <div className="info">
                      <span>温度:{item.t} </span>
                      <span>湿度:{item.rh} </span>
                      <span>voc1:{item.voc1} </span>
                      <span>voc2:{item.voc2} </span>
                    </div>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  {alarmTypeEnums(item.alarmType)}
                </Col>
                <Col span={1} style={{ fontSize: '16px' }}>
                  {/* <van-icon v-if="item.clear === 0" name="bulb-o" color="#ec0721" />
               <van-icon
                 v-if="item.clear === 1"
                 name="certificate"
                 color="#0ab955"
               /> */}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};
const DeviceLogs: React.FC<{ id: string }> = (props) => {
  const [loglist, setList] = useState<DEVICE.deviceLogs[]>([]);
  const [loading, showLoad] = useState<boolean>(true);
  useEffect(() => {
    getDeviceLog(props.id).then((res) => {
      if (res.data && res.data.length) {
        res.data.sort((a: DEVICE.deviceLogs, b: DEVICE.deviceLogs) => {
          return b.number - a.number;
        });
        const list = res.data.map((e: DEVICE.deviceLogs) => {
          const {
            year,
            month,
            date,
            hour,
            minute,
            second,
            rh,
            voc1,
            voc2,
            alarmType,
            number,
            clear,
            threshold,
            t,
          } = e;
          return {
            time: `${year}-${month < 10 ? `0${month.toString()}` : month}-${
              date < 10 ? `0${date.toString()}` : date
            } ${hour < 10 ? `0${hour.toString()}` : hour}:${
              minute < 10 ? `0${minute.toString()}` : minute
            }:${second < 10 ? `0${second.toString()}` : second}`,
            number,
            alarmType,
            rh: (rh / 10).toFixed(1),
            t: (t / 10).toFixed(1),
            voc1,
            voc2,
            threshold,
            clear,
          };
        });
        setList(list);
      } else {
        setList([]);
      }
      showLoad(false);
    });
  }, [props.id]);
  return (
    <>
      <ProCard title="报警记录" loading={loading}>
        {LogList(loglist)}
      </ProCard>
    </>
  );
};
export default DeviceLogs;
