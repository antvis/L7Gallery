import { Cascader, Form, Select, Button } from 'antd';
import type { FormInstance } from 'antd';
import React, { FC, useState } from 'react';
import AddressSelect from './components/AddressSelect';
import { IcontrolsValues } from '../type';
import { cityOptions, areaOptions, brandTypeOptions } from '../mock';
import styles from './index.module.less';

const { Item: FormItem } = Form;

interface IConditionContentProps {
  controlsForm: FormInstance;
  controlsValues: IcontrolsValues;
  setControlsValues: (val: any) => void;
}

const ConditionContent: FC<IConditionContentProps> = ({ controlsForm, setControlsValues }) => {
  const [resetButtonVisiable, setResetButtonVisiable] = useState(false);

  const valuesChange = (val: any) => {
    // 切换省份或市的时候  把  品牌类型改成“全部类型”
    if (val && Object.keys(val)?.[0] && Object.keys(val)?.[0] === 'citySelect') {
      controlsForm.setFieldsValue({
        brandSelect: '1',
      });

      setControlsValues((prve: any) => {
        return {
          ...prve,
          ...val,
          brandSelect: '1',
        };
      });
    } else {
      setControlsValues((prve: any) => {
        return {
          ...prve,
          ...val,
        };
      });
    }
    setResetButtonVisiable(true);
  };

  const resetFn = () => {
    controlsForm.resetFields();
    setControlsValues({
      citySelect: ['330000', '330100'],
      areaSelect: '全部地区',
      brandSelect: '1',
    });
    setResetButtonVisiable(false);
  };

  return (
    <div className={styles.controlsFormArea}>
      <Form
        className={styles.controlsForm}
        form={controlsForm}
        layout={'inline'}
        onValuesChange={valuesChange}
        initialValues={{
          citySelect: ['330000', '330100'],
          areaSelect: '全部地区',
          brandSelect: '1',
        }}
      >
        <FormItem name="citySelect">
          <Cascader
            style={{ width: 150 }}
            options={cityOptions}
            allowClear={false}
            showSearch
            placeholder="请选择城市"
          />
        </FormItem>
        <FormItem name="areaSelect">
          <Select
            style={{ width: 120 }}
            options={areaOptions}
            showSearch
            showArrow
            allowClear={false}
            optionFilterProp="label"
          />
        </FormItem>
        <FormItem name="brandSelect">
          <Select
            style={{ width: 120 }}
            options={brandTypeOptions}
            showSearch
            showArrow
            allowClear={false}
            optionFilterProp="label"
          />
        </FormItem>
        <FormItem name="addressSelect">
          <AddressSelect />
        </FormItem>
        {resetButtonVisiable && (
          <FormItem>
            <Button type={'primary'} onClick={resetFn}>
              重置
            </Button>
          </FormItem>
        )}
      </Form>
    </div>
  );
};

export default ConditionContent;
