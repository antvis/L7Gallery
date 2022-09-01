import { HeatmapLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const heatmapCfg = {
  shape: 'hexagonColumn',
  color: {
    field: 'sum',
    value: [
      'rgb(255, 255, 255)',
      'rgb(255, 247, 236)',
      'rgb(254, 232, 200)',
      'rgb(253, 212, 158)',
      'rgb(253, 187, 132)',
      'rgb(252, 141, 89)',
      'rgb(239, 101, 72)',
      'rgb(215, 48, 31)',
      'rgb(179, 0, 0)',
      'rgb(127, 0, 0)',
    ],
  },
  size: {
    field: 'sum',
    value: ({ sum }) => {
      console.log(sum);
      return sum * 200;
    },
  },
};

function StreetMap() {
  const [heatmapData, setHeatmapData] = useState('');

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/16cd4004-b21c-455e-a2e4-c396a5ecebe1.json')
      .then((res) => res.json())
      .then((res) => setHeatmapData(res));
  }, []);

  return (
    <LarkMap
      mapType="GaodeV2"
      style={{ height: '50vh' }}
      mapOptions={{
        style: 'dark',
        center: [12.210792, 45.246026],
        pitch: 43,
        zoom: 3.4,
      }}
    >
      <HeatmapLayer
        {...heatmapCfg}
        source={{
          data: heatmapData,
          parser: { type: 'json', x: 'lat', y: 'lng' },
          transforms: [
            {
              type: 'hexagon',
              size: 15000,
              field: 'value',
              method: 'sum',
            },
          ],
        }}
      />
    </LarkMap>
  );
}

export default StreetMap;
