import { LarkMap, HeatmapLayer, LarkMapProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const MapConfig = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'dark',
  },
};

const LayerConfig = {
  autoFit: true,
  shape: 'heatmap' as const,
  size: {
    field: 'dass',
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
    rampColors: {
      colors: ['#FF4818', '#F7B74A'],
      positions: [0, 1.0],
    },
  },
};

export default () => {
  const [source, setSource] = useState({ data: [] });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/d6896878-6033-48eb-aba0-d4e96315e8f7.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          // @ts-ignore
          data: data,
          parser: {
            type: 'csv',
            x: 'reclong',
            y: 'reclat',
          },
        });
      });
  }, []);

  return (
    <LarkMap {...(MapConfig as LarkMapProps)} style={{ height: '60vh' }}>
      <HeatmapLayer {...LayerConfig} source={source} />
    </LarkMap>
  );
};
