import { LarkMap, PointLayer, Scale, Zoom, CustomControl } from '@antv/larkmap';
import type { LarkMapProps, PointLayerProps } from '@antv/larkmap';
import React, { useEffect, useState, useMemo } from 'react';
import MyComponent from './MyComponent';

interface IdataType {
  province: string;
  busStop: string;
  address: string;
  lng: string;
  lat: string;
  WGS84lng: string;
  WGS84lat: string;
}

export default () => {
  const [data, setData] = useState<IdataType[] | undefined>([]);

  const config: LarkMapProps = useMemo(() => {
    return {
      mapType: 'GaodeV2',
      mapOptions: {
        style: 'light',
        zoom: 4,
        minZoom: 5,
        maxZoom: 9,
      },
      style: {
        height: 700,
      },
      logoPosition: 'bottomleft',
    };
  }, [data]);
  const pointLayerOptions: PointLayerProps = useMemo(() => {
    return {
      id: 'myPoitLayer',
      shape: 'circle',
      size: 7,
      color: {
        field: 'address',
        value: ['#00a4e4', '#ff6a00'],
      },
      state: {
        active: {
          color: '#33a02c',
        },
      },
      style: {
        opacity: 0.8,
      },
      source: {
        data: data,
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
      blend: 'normal',
    };
  }, [data]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/d5ec85b7-3ac6-4987-924a-3952d7e31bcb.json')
      .then((res) => res.json())
      .then((dataArr) => {
        setData(dataArr);
      });
  }, []);

  return (
    <LarkMap {...config}>
      <CustomControl position={'topleft'}>
        <h2>鼠标划过显示站点信息</h2>
      </CustomControl>
      <PointLayer {...pointLayerOptions} />
      <Scale position={'bottomleft'} />
      <Zoom position={'bottomright'} />
      <MyComponent />
    </LarkMap>
  );
};
