import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import {
  Button,
  Slider,
  Descriptions,
  Input,
  InputNumber,
  message,
  Row,
  Col,
  Radio,
  Switch,
  Skeleton,
  Space,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import { lightControl, fanControl, renameDevice } from '@/services/api-device';

type PropsType = {
  name: string;
  lightStatus: 0 | 1;
  id: string;
  fanStatus: {
    funSpeed: number;
    funMode: 0 | 1 | 2 | 3;
  };
};
let timer: any;
const Control: React.FC<PropsType> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // const [loading, showLoad] = useState<boolean>(true);
  const [lightStatus, setLightStatus] = useState<number>(0);
  const [funSpeedValue, setFunSpeedValue] = useState<number>(0);
  const [funModelValue, setFunModelValue] = useState<number>(0);
  const [deviceName, setDeviceName] = useState<string>('');
  const [loadStatus, setLoadStatus] = useState<boolean>(true);

  const onChangeDeviceName = (e: Record<string, any>) => {
    setDeviceName(e.target.value);
  };
  const onChangeModel = (e: Record<string, any>) => {
    if (timer) {
      clearTimeout(timer);
    }
    setFunModelValue(e.target.value);
    timer = setTimeout(() => {
      fanControl({
        deviceId: props.id,
        type: 0,
        value: e.target.value,
      }).then((res) => {
        setFunModelValue(e.target.value);
        if (res.code === 200) {
          return message.success(res.data);
        }
        return message.warning(res.message);
      });
    }, 2000);
  };
  const onChangeLight = (e: boolean) => {
    if (timer) {
      clearTimeout(timer);
    }
    const value = e ? 1 : 0;
    setLightStatus(value);
    timer = setTimeout(() => {
      lightControl({
        deviceId: props.id,
        value,
      }).then((res) => {
        if (res.code === 200) {
          return message.success(res.data);
        }
        return message.warning(res.message);
      });
    }, 2000);
  };
  const submitChange = async () => {
    if (deviceName.trim()) {
      const res = await renameDevice({ deviceId: props.id, name: deviceName });
      if (res.code === 200) {
        return message.success(res.data);
      }
      return message.warning(res.message);
    }
    return message.error('???????????????????????????');
  };
  const changeFunSpeedValue = (e: number) => {
    if (timer) {
      clearTimeout(timer);
    }
    setFunSpeedValue(e);
    timer = setTimeout(() => {
      fanControl({
        deviceId: props.id,
        type: 1,
        value: e,
      }).then((res) => {
        setFunSpeedValue(e);
        if (res.code === 200) {
          return message.success(res.data);
        }
        return message.warning(res.message);
      });
    }, 2000);
  };
  useEffect(() => {
    setFunSpeedValue(props.fanStatus.funSpeed);
    setFunModelValue(props.fanStatus.funMode);
    setLightStatus(props.lightStatus);
    setDeviceName(props.name);
    if (props.name) {
      setLoadStatus(false);
    }
  }, [props.id, props.fanStatus.funSpeed, props.fanStatus.funMode, props.lightStatus, props.name]);
  return (
    <>
      <ProCard title="?????????" loading={false}>
        {loadStatus ? (
          <div>
            <Space>
              <Skeleton.Avatar />
              <Skeleton.Button />
              <Skeleton.Button />
              <Skeleton.Avatar />
              <Skeleton.Input style={{ width: 200 }} />
            </Space>
            <Space>
              <Skeleton.Avatar />
              <Skeleton.Button />
              <Skeleton.Button />
              <Skeleton.Avatar />
              <Skeleton.Input style={{ width: 200 }} />
            </Space>
            <Space>
              <Skeleton.Avatar />
              <Skeleton.Input style={{ width: 200 }} />
            </Space>
            <Space>
              <Skeleton.Avatar />
              <Skeleton.Input style={{ width: 400 }} />
            </Space>
          </div>
        ) : (
          <div style={{ height: '400px', overflow: 'auto' }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="??????">
                <Switch
                  checkedChildren="??????"
                  unCheckedChildren="??????"
                  checked={Boolean(lightStatus)}
                  onChange={onChangeLight}
                />
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
                <Radio.Group
                  defaultValue={props.fanStatus.funMode}
                  onChange={onChangeModel}
                  value={funModelValue}
                >
                  {props.fanStatus.funMode}
                  <Radio value={0}>????????????</Radio>
                  <Radio value={1}>????????????</Radio>
                  <Radio value={2}>????????????</Radio>
                  <Radio value={3}>????????????</Radio>
                </Radio.Group>
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
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
              {[4].includes(currentUser?.roleType || 0) && (
                <Descriptions.Item label="?????????">
                  <Row>
                    <Col span={12}>
                      <Input value={deviceName} maxLength={50} onChange={onChangeDeviceName} />
                    </Col>
                    <Col span={4}>
                      <Button style={{ color: '#1890ff' }} type="text" onClick={submitChange}>
                        ??????
                      </Button>
                    </Col>
                    <Col span={4}>
                      <Button type="text" onClick={() => setDeviceName(props.name)}>
                        ??????
                      </Button>
                    </Col>
                  </Row>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}
      </ProCard>
    </>
  );
};

export default Control;
