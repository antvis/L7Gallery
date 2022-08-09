import { PointLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions = {
  autoFit: true,
  shape: 'circle',
  size: 8,
  color: '#0f9960',
  state: {
    active: true,
  },
  style: {
    opacity: 0.8,
  },
};

export default () => {
  const [source, setSource] = useState();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/f477ac63-178d-414d-84d7-c821658126ac.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          data: data,
          parser: { type: 'csv', x: 'Longitude', y: 'Latitude' },
        });
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <PointLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};
