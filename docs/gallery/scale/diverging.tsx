import { ILayer } from '@antv/l7';
import { CustomControl, LarkMap, ChoroplethLayer, Popup } from '@antv/larkmap';
import React, { useEffect, useRef, useState } from 'react';
import { config } from './config';
import styles from './index.less';

export default () => {
  const ref = useRef(null);
  const [unemployment, setUnemployment] = useState('');
  const [legendItems, setLegendItems] = useState<any>([]);
  const [layer, setLayer] = useState<any>();
  const [popupInfo, setPopupInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((res) => {
        const newRes: any = {
          type: 'FeatureCollection',
          features: res.features.map((item: any) => {
            return {
              ...item,
              properties: {
                ...item.properties,
                // 生成正负 随机数
                average: +(Math.random() * 100 - 50).toFixed(0),
              },
            };
          }),
        };
        setUnemployment(newRes);
      });
  }, []);

  useEffect(() => {
    if (layer) {
      setLegendItems(layer.getLegendItems('color'));
      layer.on('mousemove', ({ feature, lngLat }: any) => {
        setPopupInfo({ properties: feature.properties, lngLat });
      });
      layer.on('mouseout', () => setPopupInfo({}));
    }
  }, [layer]);

  const Legend = () => {
    if (!legendItems.length) return null;
    const gradient = legendItems.map((item: any) => item.color).join(',');
    const length = legendItems.length;
    return (
      <div className={styles.legend}>
        <div style={{ display: 'flex', background: `linear-gradient(to right,${gradient})` }}>
          {legendItems.map((item: any) => {
            return (
              <div
                key={item.color}
                ref={ref}
                onMouseMove={(e) => {
                  const findLabel = legendItems.find((l: any) => l.color === item.color);
                  const fillLayer = layer.subLayers.layerMap.get('fillLayer').layer as ILayer;
                  fillLayer.filter('average', (s) => s === findLabel.value);
                }}
                onMouseOut={() => {
                  const fillLayer = layer.subLayers.layerMap.get('fillLayer').layer as ILayer;
                  fillLayer.filter('average', (s) => s);
                }}
                className={styles.continuity}
              />
            );
          })}
        </div>
        <div className={styles.flex}>
          <div>{legendItems[0].value}</div>
          <div>{legendItems[Math.floor(length / 2)].value}</div>
          <div>{legendItems[length - 1]?.value}</div>
        </div>
      </div>
    );
  };

  return (
    <LarkMap {...(config as any)}>
      {unemployment && (
        <ChoroplethLayer
          source={{
            data: unemployment,
          }}
          fillColor={{
            field: 'average',
            value: [
              'rgb(43, 140, 190)',
              'rgb(78, 179, 211)',
              'rgb(123, 204, 196)',
              'rgb(168, 221, 181)',
              'rgb(204, 235, 197)',
              'rgb(254, 232, 200)',
              'rgb(253, 212, 158)',
              'rgb(253, 187, 132)',
              'rgb(252, 141, 89)',
              'rgb(239, 101, 72)',
            ],
            scale: {
              field: 'average',
              type: 'diverging',
            },
          }}
          onCreated={(l) => setLayer(l as any)}
        />
      )}
      <CustomControl position="bottomleft">
        <Legend />
      </CustomControl>
      {Object.keys(popupInfo).length ? (
        <Popup lngLat={popupInfo.lngLat} closeButton={false} closeOnClick={false} anchor="bottom">
          <p style={{ fontSize: 14 }}>{`
          ${popupInfo.properties.NAME}
          | ${popupInfo.properties.employed}
          | ${popupInfo.properties.unemployment_rate}`}</p>
        </Popup>
      ) : null}
      <CustomControl position="topleft">
        <h2>diverging</h2>
      </CustomControl>
    </LarkMap>
  );
};
