import {
  ChoroplethLayerStyleAttribute,
  ChoroplethLayerStyleAttributeValue,
  LineLayerStyleAttribute,
  LineLayerStyleAttributeValue,
  BubbleLayerStyleAttribute,
  BubbleLayerStyleAttributeValue,
  HeatmapLayerStyleAttribute,
  HeatmapLayerStyleAttributeValue,
} from '@antv/larkmap';
import React, { useContext } from 'react';
import { DataSourceCtx } from '../../context/DataSourceContext';
import { LayerSourceList } from '../../types';
import styles from './index.less';

function onChange(values: any, dataSource: LayerSourceList) {
  return {
    ...dataSource,
    layerOptions: values,
  };
}

export function ChoroplethStyle() {
  const { relationfield, setRelationfield } = useContext(DataSourceCtx);
  return (
    <ChoroplethLayerStyleAttribute
      className={styles['attribute']}
      initialValues={relationfield.layerOptions as any}
      fieldList={relationfield.fieldList as any}
      onChange={(values: ChoroplethLayerStyleAttributeValue) => {
        const newVal = onChange(values, relationfield);
        setRelationfield(newVal as any);
      }}
    />
  );
}

export function LineStyle() {
  const { relationfield, setRelationfield } = useContext(DataSourceCtx);
  return (
    <LineLayerStyleAttribute
      className={styles['attribute']}
      initialValues={relationfield.layerOptions as any}
      fieldList={relationfield.fieldList as any}
      onChange={(values: LineLayerStyleAttributeValue) => {
        const newVal = onChange(values, relationfield);
        setRelationfield(newVal as any);
      }}
    />
  );
}

export function BubbleStyle() {
  const { relationfield, setRelationfield } = useContext(DataSourceCtx);
  return (
    <BubbleLayerStyleAttribute
      className={styles['attribute']}
      initialValues={relationfield.layerOptions as any}
      fieldList={relationfield.fieldList as any}
      onChange={(values: BubbleLayerStyleAttributeValue) => {
        const newVal = onChange(values, relationfield);
        setRelationfield(newVal as any);
      }}
    />
  );
}

export function HeatmapStyle() {
  const { relationfield, setRelationfield } = useContext(DataSourceCtx);
  return (
    <HeatmapLayerStyleAttribute
      className={styles['attribute']}
      initialValues={relationfield.layerOptions as any}
      fieldList={relationfield.fieldList as any}
      onChange={(values: HeatmapLayerStyleAttributeValue) => {
        const newVal = onChange(values, relationfield);
        setRelationfield(newVal as any);
      }}
    />
  );
}

export function StyleAttribute({ type }: any) {
  const styles: any = {
    ChoroplethLayer: <ChoroplethStyle />,
    LineLayer: <LineStyle />,
    BubbleLayer: <BubbleStyle />,
    HeatmapLayer: <HeatmapStyle />,
  };
  return styles[type];
}
