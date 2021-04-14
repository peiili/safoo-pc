import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { getDeviceLog } from '@/services/api-device';
import { Row, Col } from 'antd';

const LogList = (lists: DEVICE.deviceLogs[]) => {
  return (
    <div>
      {lists.map((item) => (
        <Row>
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
          <Col span={8}>{item.alarmType}</Col>
          <Col span={1} style={{ fontSize: '16px' }}>
            {/* <van-icon v-if="item.clear === 0" name="bulb-o" color="#ec0721" />
              <van-icon
                v-if="item.clear === 1"
                name="certificate"
                color="#0ab955"
              /> */}
          </Col>
        </Row>
      ))}
    </div>
  );
};
const DeviceLogs: React.FC<{ id: string }> = (props) => {
  const [loglist, setList] = useState<DEVICE.deviceLogs[]>([]);
  const [loading, showLoad] = useState<boolean>(true);
  useEffect(() => {
    getDeviceLog(props.id).then((res) => {
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
      showLoad(false);
    });
  }, [props.id]);
  return (
    <>
      <ProCard loading={loading}>{LogList(loglist)}</ProCard>
    </>
  );
};
export default DeviceLogs;
