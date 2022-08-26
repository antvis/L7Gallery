import { LineLayer, LarkMap, LarkMapProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const MapConfig = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'dark',
  },
};

const LayerConfig = {
  autoFit: true,
  shape: 'line',
  size: 1,
  blend: 'max',
  state: {
    active: false,
  },
  color: {
    field: 'origin_country',
    value: [
      '#FAE300',
      '#FAC200',
      '#FD7900',
      '#E31A1A',
      '#CF1750',
      '#AE0E7F',
      '#7A0DA6',
      '#482BBD',
      '#2C51BE',
      '#223F9A',
    ],
  },
};

export default () => {
  const [source, setSource] = useState();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9689a517-6931-492c-a792-e2055bb57c0a.json')
      .then((res) => res.json())
      .then((dataArr) => {
        setSource({ data: dataArr, parser: { type: 'geojson' } });
      });
  }, []);

  return (
    <LarkMap {...(MapConfig as LarkMapProps)} style={{ height: '60vh' }}>
      <LineLayer {...LayerConfig} source={source} />
    </LarkMap>
  );
};
