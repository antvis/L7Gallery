import { Popup, useLayer, Marker, TextLayer } from '@antv/larkmap';
import type { PopupProps, MarkerProps, TextLayerProps } from '@antv/larkmap';
import type { ILngLat } from '@antv/l7';
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [lngLat, setLngLat] = useState<ILngLat>({ lng: 120.223329, lat: 30.302465 });
  const [busStopName, setBusStopName] = useState('浙江省杭州东站');
  const [textData, setTextData] = useState<{ lng: number; lat: number; n: string }[]>([
    { lng: 120.223329, lat: 30.302465, n: '浙江省杭州东站' },
  ]);
  /* 
    useLayer 这个hook只能在 larkmap container 里面使用
    获取点图层对象
  */
  const myPoitLayer = useLayer('myPoitLayer');

  const popupProps: PopupProps = {
    lngLat: lngLat,
    closeButton: false,
    closeOnClick: false,
    anchor: 'top-left',
  };
  const markersProps: MarkerProps = {
    lngLat: lngLat,
  };
  const layerOptions: TextLayerProps = {
    id: 'textOnelayer',
    field: 'n',
    style: {
      fill: 'red',
      opacity: 1,
      fontSize: 16,
      stroke: '#fff',
      strokeWidth: 2,
      textAllowOverlap: false,
      padding: [5, 5],
      textOffset: [120, 0],
    },
    source: {
      data: textData,
      parser: { type: 'json', x: 'lng', y: 'lat' },
    },
  };

  const moveFn = (e: any) => {
    const textVal = {
      lng: e.lngLat?.lng,
      lat: e.lngLat?.lat,
      n: e.feature?.address,
    };

    setLngLat(e.lngLat);
    setBusStopName(e.feature.address);
    setTextData([textVal]);
  };

  useEffect(() => {
    myPoitLayer?.on('mousemove', moveFn);
    return () => {
      myPoitLayer?.off('mousemove', moveFn);
    };
  }, [myPoitLayer]);

  return (
    <div>
      <Popup {...popupProps}>
        <p>当前选中站点为: </p>
        <p>
          <span style={{ color: 'red', fontSize: 14 }}>{busStopName}</span>
        </p>
        <p>坐标为: </p>
        <p>
          经度: <span style={{ color: 'red', fontSize: 14 }}>{lngLat.lng}</span>
        </p>
        <p>
          纬度: <span style={{ color: 'red', fontSize: 14 }}>{lngLat.lat}</span>
        </p>
      </Popup>
      <Marker {...markersProps} />
      <TextLayer {...layerOptions} />
    </div>
  );
};

export default MyComponent;
