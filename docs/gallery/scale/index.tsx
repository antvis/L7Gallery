import { ScaleTypeName } from '@antv/l7';
import { CustomControl, LarkMap, ChoroplethLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { Col, Row } from 'antd';

export const scaleType = [
  { label: 'linear', value: 'linear', desc: '连续色带' },
  // { label: 'log', value: 'log', desc: '连续色带' },
  { label: 'power', value: 'power', desc: '连续色带' },
  { label: 'quantile', value: 'quantile', desc: '等分位' },
  { label: 'quantize', value: 'quantize', desc: '等间距' },
  { label: 'threshold', value: 'threshold', desc: '自定义分段' },
  { label: 'diverging', value: 'diverging', desc: '双色带连续' },
  { label: 'sequential', value: 'sequential', desc: '连续' },
  { label: 'cat', value: 'cat', desc: 'cat' },
];

export default () => {
  const config = {
    mapOptions: {
      style: 'light',
      pitch: 10,
      zoom: 2.5,
      center: [-100.45397511735388, 37.73927151161908],
    },
    logoPosition: 'bottomleft',
  };

  const [unemployment, setUnemployment] = useState('');
  const [legendItems, setLegendItems] = useState([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((res) => setUnemployment(res));
  }, []);

  const Legend = ({ legends }: any) => {
    if (!legends) {
      return null;
    }
    const Continuity = () => {
      const gradient = (legends?.value || [])?.map((item: any) => item.color).join(',');
      const length = legends?.value?.length;
      return (
        <div>
          <div
            className={styles.continuity}
            style={{ background: `linear-gradient(to right,${gradient})` }}
          />
          <div className={styles.flex}>
            <div>{legends?.value[0]?.value}</div>
            {/* 双色带连续 */}
            {legends.key === 'diverging' ? (
              <div>{legends?.value[Math.floor(length / 2)].value}</div>
            ) : null}
            <div>{legends?.value[length - 1]?.value}</div>
          </div>
        </div>
      );
    };

    const formatValue = (value: any) => {
      if (!value) return '-';
      return +value.toFixed(1);
    };
    const Equidistant = () => {
      let values;
      if (legends.key === 'threshold') {
        const select = legends.value.filter((item: any) =>
          Array.isArray(item.value) ? item.value[0] || item.value[1] : item.value,
        );
        values = (select || []).slice(1);
      } else if (legends.key === 'cat') {
        values = legends.value.filter((item: any) => !Number(item.value));
      } else {
        values = legends.value;
      }
      return (
        <div>
          {legends.key === 'cat' ? <h4>自定义domain</h4> : null}
          <div className={styles.flexCenter}>
            {values.map((item: any, index: number) => {
              return (
                <div
                  className={styles.legendColor}
                  style={{ background: item.color }}
                  key={index}
                />
              );
            })}
          </div>
          <div className={styles.flexCenter}>
            {values.map((item: any) => {
              return (
                <div key={uniqueId('spaceLegend')} className={styles.legendValue}>
                  {Array.isArray(item.value)
                    ? formatValue(item?.value[0])
                    : legends.key === 'cat'
                    ? item?.value
                    : formatValue(item?.value)}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const legend = {
      linear: <Continuity />,
      log: <Continuity />,
      diverging: <Continuity />,
      sequential: <Continuity />,
      power: <Continuity />,
      quantile: <Equidistant />,
      quantize: <Equidistant />,
      threshold: <Equidistant />,
      cat: <Equidistant />,
    };

    return (
      // @ts-ignore
      <div className={styles.legend}> {legend[legends.key]}</div>
    );
  };

  return (
    <Row>
      {scaleType.map((item) => {
        return (
          <Col span={12} key={item.value}>
            <LarkMap
              {...(config as any)}
              mapType="Mapbox"
              key={item.value}
              id={item.value}
              style={{ height: 400 }}
            >
              {/* @ts-ignore */}
              {unemployment && (
                <ChoroplethLayer
                  key={item.value}
                  source={{
                    data: unemployment,
                  }}
                  lineWidth={0.4}
                  fillColor={{
                    field: 'unemployment_rate',
                    value: ['#f0f723', '#f8a53c', '#d8586a', '#8d159b', '#0d0787'],
                    scale: {
                      field: 'unemployment_rate',
                      type: item.value as ScaleTypeName,
                      ...(item.value === 'cat' ? { domain: ['A', 'B', 'C', 'D', 'E'] } : {}),
                    },
                  }}
                  onCreated={(l) => {
                    const items = l.getLegendItems('color');
                    // @ts-ignore
                    setLegendItems((per: any) => {
                      return [...per, { key: item.value, value: items }];
                    });
                  }}
                />
              )}
              <CustomControl position="bottomleft">
                <Legend legends={legendItems.find((items: any) => items?.key === item.value)} />
              </CustomControl>
              <CustomControl position="topleft">
                <h2>{`${item.desc}[${item.value}]`}</h2>
              </CustomControl>
            </LarkMap>
          </Col>
        );
      })}
    </Row>
  );
};
