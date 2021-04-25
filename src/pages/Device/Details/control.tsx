import { useState } from 'react';
import { Slider, Descriptions, InputNumber, Row, Col, Radio, Switch } from 'antd';
import ProCard from '@ant-design/pro-card';
import { lightControl, fanControl } from '@/services/api-device';

type PropsType = {
  lightStatus: boolean;
  id: string;
  fanStatus: {
    funSpeed: number;
    funMode: number;
  };
};
const Control: React.FC<PropsType> = (props) => {
  // const [loading, showLoad] = useState<boolean>(true);
  const [lightStatus, setLightStatus] = useState<string>('0');
  const [funSpeedValue, setFunSpeedValue] = useState<number>(0);
  const [funModelValue, setFunModelValue] = useState<string>('0');
  let timer: any;
  const onChangeModel = function (e: any) {
    if (timer) {
      clearTimeout(timer);
    }
    setFunModelValue(e.target.value);
    timer = setTimeout(() => {
      fanControl({
        deviceId: props.id,
        type: 0,
        value: e.target.value.toString(),
      }).then(() => {
        setFunModelValue(e.target.value);
      });
    }, 2000);
  };
  const onChangeLight = function (e: boolean) {
    if (timer) {
      clearTimeout(timer);
    }
    const value = e ? '1' : '0';
    setLightStatus(value);
    timer = setTimeout(() => {
      lightControl({
        deviceId: props.id,
        value,
      }).then((res) => {
        console.log(res);
      });
    }, 2000);
  };
  const changeFunSpeedValue = function (e: number) {
    if (timer) {
      clearTimeout(timer);
    }
    setFunSpeedValue(e);
    timer = setTimeout(() => {
      fanControl({
        deviceId: props.id,
        type: 1,
        value: e,
      }).then(() => {
        setFunSpeedValue(e);
      });
    }, 2000);
  };
  // useEffect(() => {
  //   showLoad(false)
  // }, [props.lightStatus])
  return (
    <>
      <ProCard title="控制台" loading={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="照明">
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={Boolean(lightStatus)}
              onChange={onChangeLight}
            />
          </Descriptions.Item>
          <Descriptions.Item label="风机模式">
            <Radio.Group onChange={onChangeModel} value={funModelValue}>
              <Radio value={'0'}>自动运行</Radio>
              <Radio value={'1'}>强制开启</Radio>
              <Radio value={'2'}>强制关闭</Radio>
              <Radio value={'3'}>时控模式</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="风机速度">
            <Row>
              <Col span={12}>
                <Slider
                  min={0}
                  max={3000}
                  onChange={changeFunSpeedValue}
                  value={typeof funSpeedValue === 'number' ? funSpeedValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={3000}
                  style={{ margin: '0 16px' }}
                  value={funSpeedValue}
                  onChange={changeFunSpeedValue}
                />
              </Col>
            </Row>
          </Descriptions.Item>
        </Descriptions>
      </ProCard>
    </>
  );
};

export default Control;
