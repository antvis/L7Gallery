import { PointLayer, LarkMap, Popup } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { MapConfig, LayerConfig } from './helper';

export default () => {
  const [source, setSource] = useState({ data: [], parse: { type: 'json' } });
  const [info, setInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/404bd2f8-cf0d-4051-97cd-26b5b8d2b0c6.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          // @ts-ignore
          data: data,
          parser: { type: 'csv', x: 'Longitude', y: 'Latitude' },
        });
      });
  }, []);

  const onPointMouseenter = (e: any) => {
    const { ChineseName, Province, Area, Longitude, Latitude } = e.feature;
    setInfo({ ChineseName, Province, Area, Longitude, Latitude });
  };

  return (
    <LarkMap {...MapConfig} style={{ height: '300px' }}>
      <PointLayer
        {...LayerConfig}
        source={source}
        onCreated={(layer) => layer?.on('mouseenter', onPointMouseenter)}
      />
      {info?.Longitude && (
        <Popup
          lngLat={{ lng: info?.Longitude, lat: info?.Latitude }}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom-left"
        >
          <p
            style={{
              width: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            名称：{info.ChineseName}
          </p>
          <p style={{ width: 250, overflow: 'hidden' }}>省份：{info.Province}</p>
          <p style={{ width: 250, overflow: 'hidden' }}>面积：{info.Area}</p>
        </Popup>
      )}
    </LarkMap>
  );
};
