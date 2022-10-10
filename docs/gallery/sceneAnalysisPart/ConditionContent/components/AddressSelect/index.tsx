import { SelectProps } from 'antd';
import { AutoComplete, Input, Tooltip } from 'antd';
import React, { FC, useState } from 'react';
import { addressOption } from '../../../mock';

interface AddressSelectProps {
  value?: string;
  onChange?: (val: string) => void;
}

const AddressSelect: FC<AddressSelectProps> = ({ value, onChange }) => {
  const [personSelectValue, setPersonSelectValue] = useState('');
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const inputChange = (e: any) => {
    setPersonSelectValue(e.target.value);
  };

  const handleSearch = (value: string) => {
    setOptions(value ? addressOption : []);
  };

  const onSelect = (value: string, option: any) => {
    setPersonSelectValue(option?.label);
    onChange?.(value);
  };

  return (
    <div>
      <Tooltip title="该项是自定义表单控件">
        <AutoComplete
          dropdownMatchSelectWidth={220}
          placement={'bottomRight'}
          style={{ width: 150 }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          value={personSelectValue}
        >
          <Input placeholder="输入即可搜索地名" value={personSelectValue} onChange={inputChange} />
        </AutoComplete>
      </Tooltip>
    </div>
  );
};

export default AddressSelect;
