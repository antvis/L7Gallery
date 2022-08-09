import { BubbleLayer, LarkMap, LineLayer } from '@antv/larkmap';
import React from 'react';
import { pointData } from './mock';

export default () => {
  const parserData = () => {
    return {
      type: 'FeatureCollection',
      features: pointData
        .filter((item) => item.latitude_form)
        .map((item) => {
          return {
            type: 'Feature',
            properties: { ...item },
            geometry: {
              type: 'LineString',
              coordinates: [
                [item.longitude_form, item.latitude_form],
                [item.longitude_to, item.latitude_to],
              ],
            },
          };
        }),
    };
  };

  return (
    <LarkMap
      mapType="GaodeV1"
      style={{ height: '60vh' }}
      mapOptions={{ style: 'dark', zoom: 4, center: [113.477391, 34.626256] }}
    >
      <LineLayer
        size={2}
        color={'white'}
        animate={{
          enable: true,
          interval: Math.random(),
          duration: 7.8,
          trailLength: 2,
        }}
        source={{ data: parserData(), parser: { type: 'geojson' } }}
      />

      <BubbleLayer
        label={{
          field: 'time',
          style: { fontSize: 12, textOffset: [70, -4], fill: 'white' },
        }}
        source={{
          data: pointData,
          parser: { type: 'json', x: 'longitude_to', y: 'latitude_to' },
        }}
        radius={{
          field: 'name',
          value: (val: Record<string, any>) => (val.name === '郑州' ? 15 : 8),
        }}
      />
    </LarkMap>
  );
};
