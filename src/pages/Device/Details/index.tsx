import React, { useState, useEffect } from 'react';
import { Gauge } from '@ant-design/charts';
import { Row, Col, Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import Logs from './logs';
import Goods from './goods';
import Control from './control';
import { getDeviceInfo } from '@/services/api-device';

type PropsType = {
  id: string;
  back: Function;
  readonly?: boolean;
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
  const [lightOn, setLightStatus] = useState<0 | 1>(0);
  const [deviceName, setDeviceName] = useState<string>('');
  let timer: any;
  const goBack = function () {
    clearTimeout(timer);
    props.back();
  };
  const getInfo = function () {
    getDeviceInfo(props.id).then((e) => {
      if (e.data) {
        setItem(e.data);
        setDeviceName(e.data.name);
        setLightStatus(e.data.light);
      }
    });
  };
  useEffect(() => {
    timer = setTimeout(() => {
      getInfo();
    }, 5000);
  }, []);
  useEffect(() => {
    getInfo();
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
          <Button onClick={goBack}>返回列表</Button>
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
        <ProCard gutter={16} ghost>
          <Row gutter={16}>
            {!props.readonly && (
              <Col span={8}>
                <Control
                  name={deviceName}
                  lightStatus={lightOn}
                  id={props.id}
                  fanStatus={{ funSpeed: item.funSpeed, funMode: item.funMode }}
                ></Control>
              </Col>
            )}
            <Col span={props.readonly ? 12 : 8}>
              <Goods id={props.id}></Goods>
            </Col>
            <Col span={props.readonly ? 12 : 8}>
              <Logs id={props.id} />
            </Col>
          </Row>
        </ProCard>
      </ProCard>
    </>
  );
};

export default DeviceDetails;
