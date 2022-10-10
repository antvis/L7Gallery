import {
  ChoroplethLayer,
  LineLayer,
  BubbleLayer,
  HeatmapLayer,
  ChoroplethLayerProps,
  LineLayerProps,
  BubbleLayerProps,
  HeatmapLayerProps,
} from '@antv/larkmap';
import { message, Spin } from 'antd';
import React, { useContext, useEffect } from 'react';
import { DataSourceCtx, Relationfield } from '../context/DataSourceContext';
import { LayerSourceList } from '../types';

export function Layer() {
  const { relationfield, loading, setLoading } = useContext(DataSourceCtx);
  const getLayer = (item: LayerSourceList & Relationfield) => {
    try {
      if (!Object.keys(relationfield).length) {
        return;
      }
      const layers = (params: any) => {
        return {
          ChoroplethLayer: <ChoroplethLayer {...params} />,
          LineLayer: <LineLayer {...params} />,
          BubbleLayer: <BubbleLayer {...params} />,
          HeatmapLayer: <HeatmapLayer {...params} />,
        };
      };
      // @ts-ignore
      return layers({ id: item.sourceId, ...item.layerOptions, source: item.sourceData })[
        item.layerType
      ];
    } catch (error) {
      message.info('数据有误');
    }
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);

  return <Spin spinning={loading}>{getLayer(relationfield)}</Spin>;
}
