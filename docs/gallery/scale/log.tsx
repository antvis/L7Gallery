import { CustomControl, LarkMap, ChoroplethLayer, LegendRamp } from '@antv/larkmap';
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

  const Legend = () => {
    if (!legendItems.length) return null;
    return (
      <LegendRamp
        lableUnit=""
        isContinuous
        className={styles.legend}
        colors={legendItems.map((item: any) => item.color)}
        labels={legendItems.map((item: any) => item.value)}
      />
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
            scale: {
              field: 'unemployment_rate',
              type: 'log',
            },
          }}
          onCreated={(l) => setLegendItems(l.getLegendItems('color'))}
        />
      )}
      <CustomControl position="bottomleft">
        <Legend />
      </CustomControl>
      <CustomControl position="topleft">
        <h2>log</h2>
      </CustomControl>
    </LarkMap>
  );
};
