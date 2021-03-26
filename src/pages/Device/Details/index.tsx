import React, { useState, useEffect } from 'react';
import { Gauge } from '@ant-design/charts';
import { Row, Col } from 'antd';
import style from './index.less';
import ProCard from '@ant-design/pro-card';
import Logs from './logs';
import { getDeviceInfo } from '@/services/api-device';

type PropsType = {
  id: string;
};
const DeviceDetails: React.FC<PropsType> = (props) => {
  const [item, setItem] = useState<API.DevicesItem>({
    enableDebug: 0,
    funMode: 0,
    funSpeed: 0,
    isOnline: 0,
    light: 0,
    rh: 0,
    t: 0,
    voc1: 0,
    voc2: 0,
  });
  const [lightOn, setLightStatus] = useState<boolean>(false);
  useEffect(() => {
    getDeviceInfo(props.id).then((e) => {
      if (e.data) {
        setItem(e.data);
        setLightStatus(Boolean(e.data.light));
      }
    });
  }, [props.id]);
  const VOC1_config = {
    axis: {
      label: {
        formatter: function formatter(v: any) {
          return Number(v) * 100;
        },
      },
      subTickLine: { count: 5 },
    },
    width: window.self.innerWidth / 10,
    height: window.self.innerWidth / 10,
    percent: item.voc1 / 100,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '16px',
        },
        formatter: function formatter(a: any) {
          return `VOC1:${a.percent * 100}`;
        },
      },
    },
  };
  const VOC2_config = {
    axis: {
      label: {
        formatter: function formatter(v: any) {
          return Number(v) * 100;
        },
      },
      subTickLine: { count: 5 },
    },
    width: window.self.innerWidth / 10,
    height: window.self.innerWidth / 10,
    percent: item.voc2 / 100,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '16px',
        },
        formatter: function formatter(a: any) {
          return `VOC2:${a.percent * 100}`;
        },
      },
    },
  };
  const TMP_config = {
    axis: {
      label: {
        formatter: function formatter(v: any) {
          return Number(v) * 80;
        },
      },
      subTickLine: { count: 5 },
    },
    width: window.self.innerWidth / 10,
    height: window.self.innerWidth / 10,
    percent: item.t / 10 / 80,
    range: { ticks: [0, 1], color: 'l(0) 0:#fab120 1:#f56e53' },
    // type: 'meter',
    // meter: {
    //   stepRatio: [-40, 80]
    // },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '16px',
        },
        formatter: function formatter(a: any) {
          return `温度:${a.percent * 80}℃`;
        },
      },
    },
  };
  const RH_config = {
    axis: {
      label: {
        formatter: function formatter(v: any) {
          return Number(v) * 100;
        },
      },
      subTickLine: { count: 5 },
    },
    width: window.self.innerWidth / 10,
    height: window.self.innerWidth / 10,
    percent: item.rh / 10 / 100,
    range: { ticks: [0, 1], color: 'l(0) 0:#bde8ff 1:#9ec9ff' },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '16px',
        },
        formatter: function formatter(a: any) {
          return `湿度:${(a.percent * 100).toFixed(1)}RH`;
        },
      },
    },
  };
  return (
    <>
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard>
          <Row gutter={20}>
            <Col>
              <Gauge {...VOC1_config} />
            </Col>
            <Col>
              <Gauge {...VOC2_config} />
            </Col>
            <Col>
              <Gauge {...TMP_config} />
            </Col>
            <Col>
              <Gauge {...RH_config} />
            </Col>
          </Row>
        </ProCard>
        <ProCard gutter={16} ghost style={{ height: 200 }}>
          <ProCard title="物品" colSpan={16} />
          <ProCard title="报警记录" colSpan={8}>
            <Logs id={props.id} />
          </ProCard>
        </ProCard>
      </ProCard>

      <Row justify="center" gutter={20}>
        <Col>
          <span className={lightOn ? `${style.iconfontAction}` : `${style.iconfont}`}>
            &#xe629;
          </span>
          照明
        </Col>
        <Col>
          <span className={`${style.iconfont} ${style.iconfontFanAction}`}>&#xe620;</span>
          风机
        </Col>
      </Row>
    </>
  );
};

export default DeviceDetails;
