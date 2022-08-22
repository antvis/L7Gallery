import { LarkMap, LarkMapProps, LineLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapOptions: {
    style: 'dark',
    center: [-73.993896, 40.75011],
    zoom: 6,
    rotation: 20,
  },
};

const layerStyle = {
  shape: 'arc3d',
  color: '#a13ece',
  size: {
    field: 'passenger_count',
    value: [1, 3],
  },
  animate: {
    interval: 1,
    trailLength: 1,
    duration: 2,
  },
  state: {
    active: true,
  },
  blend: 'normal',
};

export default () => {
  const [source, setSource] = useState('');
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/166c95f5-7d02-4586-a9a1-ee470e1e9689.csv')
      .then((res) => res.text())
      .then((data) => setSource(data));
  }, []);
  console.log(source);
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '500px' }}>
      <LineLayer
        source={{
          data: source,
          parser: {
            type: 'csv',
            y: 'pickup_latitude',
            x: 'pickup_longitude',
            y1: 'dropoff_latitude',
            x1: 'dropoff_longitude',
          },
        }}
        {...layerStyle}
      />
    </LarkMap>
  );
};
