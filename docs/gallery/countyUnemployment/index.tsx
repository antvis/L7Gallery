import { LarkMap, Scale, Zoom, Popup, ChoroplethLayer } from '@antv/larkmap';
import type { LarkMapProps, PopupProps, ChoroplethLayerProps } from '@antv/larkmap';
import type { ILngLat } from '@antv/l7';
import React, { useState, useEffect, useMemo } from 'react';
import { colorArr } from './utils';
import styles from './index.module.less';

interface IpopInfo {
  NAME?: string;
  ALAND?: number;
  unemployment_rate?: number;
  LSAD?: string;
  AWATER?: number;
}

/** 结合 https://l7plot.antv.vision/zh/docs/api/composite-layers/choropleth-layer */
const CountyUnemployment = () => {
  const [lngLat, setLngLat] = useState<ILngLat>({
    lng: -97.39054553110171,
    lat: 39.448335349067435,
  });
  const [popInfo, setPopINfo] = useState<IpopInfo>({
    NAME: 'Cloud',
    ALAND: 1852726628,
    unemployment_rate: 4.4,
    LSAD: '06',
    AWATER: 6859887,
  });
  const [data, setData] = useState([]);

  /** 地图属性配置 */
  const config: LarkMapProps = useMemo(() => {
    return {
      mapType: 'GaodeV2',
      mapOptions: {
        style: 'dark',
        pitch: 0,
        zoom: 3.7,
        center: [-97.39054553110171, 39.448335349067435],
      },
      style: {
        height: 700,
      },
      logoPosition: 'bottomleft',
    };
  }, [data]);

  const moveFn = (featureInfo: any) => {
    setLngLat(featureInfo.lngLat);
    setPopINfo({
      NAME: featureInfo.feature.properties.NAME,
      ALAND: featureInfo.feature.properties.ALAND,
      unemployment_rate: featureInfo.feature.properties.unemployment_rate,
      LSAD: featureInfo.feature.properties.LSAD,
      AWATER: featureInfo.feature.properties.AWATER,
    });
  };
  const outFn = () => {
    setLngLat({} as ILngLat);
    setPopINfo({});
  };

  /** 区域图层属性配置 */
  const choroplethOptions: ChoroplethLayerProps = useMemo(() => {
    return {
      id: 'unemploymentRateLayer',
      // autoFit: true,
      fillColor: {
        field: 'unemployment_rate',
        value: colorArr,
        scale: {
          type: 'quantile',
        },
      },
      opacity: 0.8,
      // strokeColor: 'orange',
      lineWidth: 0.2,
      lineOpacity: 1,
      state: {
        active: { strokeColor: 'orange', lineWidth: 1.5, lineOpacity: 0.8 },
        select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
      },
      label: {
        field: 'NAME',
        visible: false,
        style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
      },
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      onCreated: (layer) => {
        layer?.on('mousemove', moveFn);
        layer?.on('mouseout', outFn);
      },
      blend: 'normal',
    };
  }, [data, colorArr]);
  /** 信息框属性配置 */
  const popupProps: PopupProps = useMemo(() => {
    return Object.keys(lngLat)?.length
      ? {
          className: styles['popup-area'],
          lngLat: lngLat,
          closeButton: false,
          closeOnClick: false,
          anchor: 'bottom',
        }
      : ({} as PopupProps);
  }, [lngLat]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((dataArr) => {
        setData(dataArr);
      });
  }, []);

  return (
    <LarkMap {...config}>
      {/* 区域图层 */}
      <ChoroplethLayer {...choroplethOptions} />
      {/* 信息框 */}
      {Object.keys(popInfo)?.length && (
        <Popup {...popupProps}>
          <div>
            <div className={styles['title-area']}>Counties-Unemployment</div>
            <ul className={styles['ul-style']}>
              {Object.keys(popInfo)?.map((key: string, index: number) => {
                return (
                  <li key={key}>
                    <div>{key}</div>
                    <div>{Object.values(popInfo)[index]}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Popup>
      )}
      {/* 比例尺控件 */}
      <Scale position={'bottomleft'} />
      {/* 缩放器控件 */}
      <Zoom position={'bottomright'} />
    </LarkMap>
  );
};

export default CountyUnemployment;
