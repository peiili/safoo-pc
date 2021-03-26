import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { getDeviceLog } from '@/services/api-device';

const DeviceLogs: React.FC<{ id: string }> = (props) => {
  const [list, setList] = useState<DEVICE.deviceLogs[]>([]);
  const [loading, showLoad] = useState<boolean>(true);
  useEffect(() => {
    getDeviceLog(props.id).then((res) => {
      setList(res.data);
      showLoad(false);
    });
  }, [props.id]);
  return (
    <>
      <ProCard loading={loading}>{list}</ProCard>
    </>
  );
};
export default DeviceLogs;
