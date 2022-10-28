import {
  CustomControl,
  LarkMap,
  LineLayer,
  LineLayerProps,
  TextLayer,
  TextLayerProps,
} from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

export default () => {
  const [source, setSource] = useState({
    data: '',
    parser: { type: 'csv', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' },
  });
  const [textSource, setTextSource] = useState({
    data: [],
    parser: { type: 'json', x: 'x', y: 'y' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/7455fead-1dc0-458d-b91a-fb4cf99e701e.txt')
      .then((res) => res.text())
      .then((data) => setSource({ ...source, data }));
    fetch('https://gw.alipayobjects.com/os/basement_prod/67f47049-8787-45fc-acfe-e19924afe032.json')
      .then((res) => res.json())
      .then((nodes) => {
        setTextSource({ ...textSource, data: nodes });
        console.log(nodes);
      });
  }, []);

  const layerOptions: Omit<LineLayerProps, 'source'> = {
    autoFit: true,
    shape: 'arc' as const,
    size: 1,
    color: '#6495ED',
    state: { active: { color: '#FFF684' } },
    style: {
      opacity: 1,
      lineType: 'solid' as const,
    },
    animate: {
      duration: 4,
      interval: 0.2,
      trailLength: 0.6,
    },
  };

  const textLayerOptions: Omit<TextLayerProps, 'source'> = {
    autoFit: true,
    field: 'v',
    style: {
      fill: {
        field: 'v',
        value: [
          '#ffba08',
          '#faa307',
          '#f48c06',
          '#e85d04',
          '#dc2f02',
          '#d00000',
          '#9d0208',
          '#6a040f',
          '#370617',
          '#03071e',
        ],
      },
      opacity: 1,
      fontSize: 18,
      stroke: '#fff',
      strokeWidth: 2,
      textAllowOverlap: false,
      padding: [10, 10] as [number, number],
    },
  };

  return (
    <LarkMap
      mapType="GaodeV2"
      style={{ height: '60vh' }}
      mapOptions={{
        style: 'light',
        zoom: 5,
      }}
    >
      <LineLayer {...layerOptions} source={source} />
      <TextLayer {...textLayerOptions} source={textSource} />
      <CustomControl position="bottomleft"></CustomControl>
    </LarkMap>
  );
};
