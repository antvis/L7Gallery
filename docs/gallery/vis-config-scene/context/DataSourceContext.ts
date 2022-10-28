import { useContext, createContext } from 'react';
import { DispatchLayerSourceList, LayerSourceList } from '../types';

export type Relationfield = {
  x: string;
  y: string;
} & LayerSourceList;

interface DataSourceEvent {
  dataSourceList: LayerSourceList[];
  setDataSourceList: DispatchLayerSourceList<LayerSourceList[]>;
  dataSource: LayerSourceList;
  setDataSource: DispatchLayerSourceList<LayerSourceList>;
  loading: boolean;
  setLoading: DispatchLayerSourceList<boolean>;
  relationfield: Relationfield & LayerSourceList;
  setRelationfield: DispatchLayerSourceList<Relationfield & LayerSourceList>;
}

const functions = () => {};

const ctx = {
  dataSourceList: [] as LayerSourceList[],
  setDataSourceList: functions,
  dataSource: {} as LayerSourceList,
  setDataSource: functions,
  loading: false,
  setLoading: functions,
  relationfield: {} as Relationfield,
  setRelationfield: functions,
};

export const DataSourceCtx = createContext<DataSourceEvent>(ctx);
