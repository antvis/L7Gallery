import { PointLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions = {
  autoFit: true,
  shape: 'circle',
  blend: 'normal',
  color: {
    field: 'Area (km2)',
    value: [
      'rgb(247, 252, 240)',
      'rgb(224, 243, 219)',
      'rgb(204, 235, 197)',
      'rgb(168, 221, 181)',
      'rgb(123, 204, 196)',
      'rgb(78, 179, 211)',
      'rgb(43, 140, 190)',
      'rgb(8, 104, 172)',
      'rgb(8, 64, 129)',
    ],
    scale: { type: 'quantile' },
  },
  size: {
    field: 'Area (km2)',
    value: [0, 2, 4, 6, 8, 10],
    scale: { type: 'quantile' },
  },
  state: {
    active: false,
  },
  style: {
    opacity: 0.8,
    stroke: '#fff',
    strokeWidth: 0.2,
  },
};

export default () => {
  const [source, setSource] = useState({ data: [], parse: { type: 'json' } });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/f477ac63-178d-414d-84d7-c821658126ac.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          // @ts-ignore
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
