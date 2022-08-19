import { LarkMap, PolygonLayer, Scale, Zoom, Popup } from '@antv/larkmap';
import type { PolygonLayerProps, LarkMapProps, PopupProps } from '@antv/larkmap';
import type { ILngLat } from '@antv/l7';
import React, { useState, useEffect } from 'react';
import { colorArr } from './utils';
import styles from './index.module.less';

interface IpopInfo {
  NAME?: string;
  ALAND?: number;
  unemployment_rate?: number;
  LSAD?: string;
  AWATER?: number;
}

/** 结合 https://l7plot.antv.vision/zh/docs/api/composite-layers/polygon-layer#%E4%B8%80%E9%85%8D%E7%BD%AE */
const CountyUnemployment = () => {
  const [lngLat, setLngLat] = useState<ILngLat>({
    lng: -104.30931729871608,
    lat: 49.02755406229335,
  });
  const [popInfo, setPopINfo] = useState<IpopInfo>({
    NAME: 'Sheridan',
    ALAND: 4340307007,
    unemployment_rate: 2.7,
    LSAD: '06',
    AWATER: 75071798,
  });
  const [data, setData] = useState([]);

  /** 地图属性配置 */
  const config: LarkMapProps = {
    mapType: 'Mapbox',
    mapOptions: {
      style: 'light',
      pitch: 0,
      zoom: 3,
      center: [-104.81959337883367, 44.146070623755435],
    },
    style: {
      height: 700,
    },
    logoPosition: 'bottomleft',
  };

  const enterFn = (featureInfo: any) => {
    setLngLat(featureInfo.lngLat);
    setPopINfo({
      NAME: featureInfo.feature.properties.NAME,
      ALAND: featureInfo.feature.properties.ALAND,
      unemployment_rate: featureInfo.feature.properties.unemployment_rate,
      LSAD: featureInfo.feature.properties.LSAD,
      AWATER: featureInfo.feature.properties.AWATER,
    });
  };

  /** 面图层属性配置 */
  const layerOptions: PolygonLayerProps = {
    id: 'unemploymentRateLayer',
    // autoFit: true,
    shape: 'fill',
    color: {
      field: 'unemployment_rate',
      value: colorArr,
      scale: {
        type: 'quantile',
      },
    },
    state: {
      active: {
        color: 'orange',
      },
    },
    style: {
      opacity: 0.8,
    },
    blend: 'normal',
    source: {
      data: data,
      parser: { type: 'geojson' },
    },
    onCreated: (layer) => {
      layer?.on('mouseenter', enterFn);
    },
  };
  /** 信息框属性配置 */
  const popupProps: PopupProps = {
    className: styles['popup-area'],
    lngLat: lngLat,
    closeButton: false,
    closeOnClick: false,
    anchor: 'bottom',
  };

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((dataArr) => {
        setData(dataArr);
      });
  }, []);

  return (
    <LarkMap {...config}>
      {/* 面图层 */}
      <PolygonLayer {...layerOptions} />
      {/* 信息框 */}
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
      {/* 比例尺控件 */}
      <Scale position={'bottomleft'} />
      {/* 缩放器控件 */}
      <Zoom position={'bottomright'} />
    </LarkMap>
  );
};

export default CountyUnemployment;
