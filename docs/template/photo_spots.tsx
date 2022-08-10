import { LarkMap, LarkMapProps, PointLayer, PointLayerProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

export default () => {
  const [pointData, setPointData] = useState({
    data: [],
    parser: { type: 'json', x: 'lat', y: 'lng' },
  });
  const config = {
    mapType: 'GaodeV1',

    mapOptions: {
      style: 'dark',
      center: [120.210792, 30.246026],
      zoom: 1,
    },
  };

  const fetchPointData = async () => {
    const res = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/16cd4004-b21c-455e-a2e4-c396a5ecebe1.json',
    );
    const result = await res.json();
    setPointData({ ...pointData, data: result });
  };

  const layerOptions = {
    autoFit: true,
    shape: 'circle',
    size: 4,
    blend: 'additive',
    color: {
      field: 'value',
      value: [
        '#0A3663',
        '#1558AC',
        '#3771D9',
        '#4D89E5',
        '#64A5D3',
        '#72BED6',
        '#83CED6',
        '#A6E1E0',
        '#B8EFE2',
        '#D7F9F0',
      ],
    },
    style: {
      opacity: 0.6,
    },
  };
  useEffect(() => {
    fetchPointData();
  }, []);
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '500px' }}>
      <PointLayer {...(layerOptions as PointLayerProps)} source={pointData} />
    </LarkMap>
  );
};
