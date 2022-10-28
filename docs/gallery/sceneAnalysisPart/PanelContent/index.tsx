import type { Feature } from '@turf/turf';
import React, { FC } from 'react';
import { Tabs, Empty } from 'antd';
import { ProFormField } from '@alipay/tech-ui';
import TopName from './components/TopName';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import ThirdComponent from './components/ThirdComponent';
import { IcontrolsValues } from '../type';
import styles from './index.module.less';

const { PRESENTED_IMAGE_SIMPLE } = Empty;

interface PanelContentProps {
  selectedFeatures: Feature[];
  controlsValues: IcontrolsValues;
  bigSider: boolean;
  setBigSider: (val: boolean) => void;
}

const PanelContent: FC<PanelContentProps> = ({
  selectedFeatures,
  controlsValues,
  bigSider,
  setBigSider,
}) => {
  const tabsItems = [
    {
      label: `选项卡1`,
      key: '1',
      children: (
        <>
          <FirstComponent controlsValues={controlsValues} selectedFeatures={selectedFeatures} />
          <SecondComponent controlsValues={controlsValues} selectedFeatures={selectedFeatures} />
          <ThirdComponent />
        </>
      ),
    },
    {
      label: `选项卡2`,
      key: '2',
      children: (
        <>
          <div>当前筛选条件值为：</div>
          <ProFormField
            ignoreFormItem
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            mode="read"
            valueType="jsonCode"
            text={JSON.stringify(controlsValues)}
          />
          <div style={{ marginTop: 40 }}>
            <Empty image={PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />
          </div>
        </>
      ),
    },
    {
      label: `选项卡3`,
      key: '3',
      children: (
        <>
          <div style={{ marginTop: 40 }}>
            <Empty image={PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className={styles.panelContentArea}>
      <TopName selectedFeatures={selectedFeatures} bigSider={bigSider} setBigSider={setBigSider} />
      <Tabs
        className={styles.tabsPart}
        type={'card'}
        tabBarGutter={4}
        size={'small'}
        items={tabsItems}
      />
    </div>
  );
};

export default PanelContent;
