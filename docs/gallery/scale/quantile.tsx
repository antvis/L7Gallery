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
    const labels = Array.from(new Set(legendItems.map((item: any) => [...item.value]).flat()));
    return (
      <LegendRamp
        lableUnit=""
        className={styles.legend}
        colors={legendItems.map((item: any) => item.color)}
        labels={labels as number[]}
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
            scale: { type: 'quantile', domain: [3, 20] },
          }}
          onCreated={(l) => setLegendItems(l.getLegendItems('color'))}
        />
      )}
      <CustomControl position="bottomleft">
        <Legend />
      </CustomControl>
      <CustomControl position="topleft">
        <h2>{'quantile'}</h2>
      </CustomControl>
    </LarkMap>
  );
};
