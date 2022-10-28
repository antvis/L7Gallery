import { Dispatch } from 'react';
import {
  ChoroplethLayerStyleAttributeValue,
  HeatmapLayerStyleAttributeValue,
  LineLayerStyleAttributeValue,
  BubbleLayerStyleAttributeValue,
} from '@antv/larkmap';
import { Feature, FeatureCollection } from '@turf/turf';
import { FieldSelectOptionType } from '@antv/larkmap/es/components/LayerAttribute/types';

type LayerOptions =
  | ChoroplethLayerStyleAttributeValue
  | HeatmapLayerStyleAttributeValue
  | LineLayerStyleAttributeValue
  | BubbleLayerStyleAttributeValue;

type SourceType = 'csv' | 'geojson' | 'json';

export type GeoData = {
  data: FeatureCollection | Record<string, any>[];
  parser: { type: SourceType; x: string; y: string };
};

export interface LayerSourceList {
  sourceId: string;
  sourceData: GeoData;
  sourceName: string;
  layerOptions: LayerOptions;
  fieldList: FieldSelectOptionType[];
  layerType: string;
}

export type DispatchLayerSourceList<T> = Dispatch<React.SetStateAction<T>>;
