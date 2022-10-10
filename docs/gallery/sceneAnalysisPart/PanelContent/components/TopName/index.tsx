import type { Feature } from '@turf/turf';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { Tooltip } from 'antd';
import styles from './index.module.less';

interface TopNameProps {
  selectedFeatures: Feature[];
  bigSider: boolean;
  setBigSider: (val: boolean) => void;
}

const TopName: FC<TopNameProps> = ({ selectedFeatures, bigSider, setBigSider }) => {
  return (
    <div className={styles.topNameArea}>
      <div>
        当前选中图层：
        <span className={styles.selectedName}>
          {selectedFeatures?.[0]?.properties?.name || '未选中图层'}
        </span>
      </div>
      <div>
        {bigSider ? (
          <Tooltip placement={'left'} title="变窄">
            <ShrinkOutlined rotate={44} onClick={() => setBigSider(false)} />
          </Tooltip>
        ) : (
          <Tooltip placement={'left'} title="变宽">
            <ArrowsAltOutlined rotate={44} onClick={() => setBigSider(true)} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default TopName;
