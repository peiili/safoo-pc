import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getDepartmentList } from '@/services/api-department';

const { Option } = Select;

const DepartmentSelect: React.FC<{ id: string }> = (props) => {
  const [currentDep, changeDepartment] = useState<string>('');
  const [depList, setDepList] = useState<Record<string, any>[]>([]);
  const handleChangeDepartment = (value: any) => {
    changeDepartment(value);
  };
  const getOptions = async () => {
    const res = await getDepartmentList(1);
    if (res.code === 200) {
      setDepList(res.data.list);
    }
  };
  useEffect(() => {
    getOptions();
  }, [props.id]);

  return (
    <Select
      value={currentDep}
      style={{ width: 120 }}
      onChange={(str) => handleChangeDepartment(str)}
    >
      {depList.map((e) => (
        <Option key={e.id} value={e.id}>
          {e.name}
        </Option>
      ))}
    </Select>
  );
};
export default DepartmentSelect;
