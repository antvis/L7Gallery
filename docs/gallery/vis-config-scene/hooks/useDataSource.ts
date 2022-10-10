import { useState } from 'react';
import { Relationfield } from '../context/DataSourceContext';
import { LayerSourceList } from '../types';
import { useImmer } from 'use-immer';

interface DataSource {
  dataSourceList: LayerSourceList[];
  dataSource: LayerSourceList;
  loading: boolean;
  relationfield: Relationfield & LayerSourceList;
}

export function useDataSource() {
  const [dataSourceList, setDataSourceList] = useState<LayerSourceList[]>([]);
  const [dataSource, setDataSource] = useState<LayerSourceList>({} as any);
  const [loading, setLoading] = useState(false);
  const [relationfield, setRelationfield] = useState<Relationfield & LayerSourceList>({} as any);

  return {
    dataSource,
    setDataSource,
    dataSourceList,
    setDataSourceList,
    loading,
    setLoading,
    relationfield,
    setRelationfield,
  };
}
