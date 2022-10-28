import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import { ConfigurePanel } from '../components/ConfigurePanel';
import { SourceLayer } from '../components/SourceLayer';
import styles from './index.less';
import { BuildData } from '../components/BuildData';

export function PanelContainer() {
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);

  // https://gw.alipayobjects.com/os/bmw-prod/955b43e4-21ef-42f4-a2b6-c08c843f5d18.json
  // https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json
  // https://gw.alipayobjects.com/os/basement_prod/0d2f0113-f48b-4db9-8adc-a3937243d5a3.json
  return (
    <div className={styles['panel']}>
      <div className={styles['panel-maplayer']}>
        <div className={styles['panel-maplayer-header']}>
          <Button type="text" size="small">
            地图图层
          </Button>
          <Button type="link" size="small" onClick={() => setOpen(true)}>
            + 新建
          </Button>
        </div>
        <Divider type="horizontal" style={{ margin: '8px 0' }} />
        <SourceLayer setWidth={setWidth} />
      </div>
      <BuildData open={open} setOpen={setOpen} />
      <ConfigurePanel width={width} setWidth={setWidth} />
    </div>
  );
}
