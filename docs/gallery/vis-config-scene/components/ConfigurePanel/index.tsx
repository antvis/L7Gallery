import { CloseCircleOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { Fragment, useContext, useEffect } from 'react';
import { DataSourceCtx } from '../../context/DataSourceContext';
import styles from './index.less';
import { StyleAttribute } from './StyleAttribute';
import { set } from 'lodash';

interface ConfigurePanelProps {
  width: number;
  setWidth: (val: number) => void;
}
export function ConfigurePanel(props: ConfigurePanelProps) {
  const { width, setWidth } = props;
  const { relationfield } = useContext(DataSourceCtx);

  return (
    <div className={styles['configure']} style={{ width }}>
      <div className={styles['configure-content']}>
        <div
          className={styles['configure-content-header']}
          style={{ display: Boolean(width) ? 'flex' : 'none' }}
        >
          <h4 style={{ color: '#333' }}>图层设置</h4>
          <CloseCircleOutlined onClick={() => setWidth(0)} />
        </div>
        {Object.keys(relationfield).length && Boolean(width) ? (
          <div>
            <StyleAttribute type={relationfield.layerType} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
