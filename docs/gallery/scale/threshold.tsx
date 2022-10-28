import { CustomControl, LarkMap, ChoroplethLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { colors, config } from './config';
import styles from './index.less';

export default () => {
  const [unemployment, setUnemployment] = useState('');
  const [legendItems, setLegendItems] = useState<any>([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((res) => setUnemployment(res));
  }, []);

  const Legends = () => {
    if (!legendItems.length) return null;
    const labels = Array.from(
      new Set(legendItems.map((item: any) => [...item.value]).flat()),
    ).filter((g) => Boolean(g));
    return (
      <div className={styles.threshold}>
        <div className={styles.center}>
          {legendItems.map((item: any, index: number) => {
            return (
              <div
                className={styles['threshold-color']}
                style={{ background: item.color }}
                key={index}
              />
            );
          })}
        </div>
        <div className={styles['threshold-labels']}>
          {labels.map((item: any) => {
            return (
              <div
                key={item}
                style={{ width: 270 / 9 }}
                className={styles['threshold-labels-item']}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <LarkMap {...(config as any)}>
      {unemployment && (
        <ChoroplethLayer
          source={{
            data: unemployment,
          }}
          fillColor={{
            field: 'unemployment_rate',
            value: colors,
            scale: { type: 'threshold', domain: [2, 4, 6, 8, 10, 12, 14, 16] },
          }}
          onCreated={(l) => setLegendItems(l.getLegendItems('color'))}
        />
      )}
      <CustomControl position="bottomleft">
        <Legends />
      </CustomControl>
      <CustomControl position="topleft">
        <h2>threshold</h2>
      </CustomControl>
    </LarkMap>
  );
};
