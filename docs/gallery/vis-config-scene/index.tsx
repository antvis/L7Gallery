import { LarkMap } from '@antv/larkmap';
import React from 'react';
import 'antd/dist/antd.css';
import { PanelContainer } from './Panel';
import { mapconfig } from './config';
import { Layer } from './Layer';
import { DataSourceCtx } from './context/DataSourceContext';
import { useDataSource } from './hooks/useDataSource';
import { PopupModal } from './components/Popup';

export default () => {
  const source = useDataSource();
  return (
    <DataSourceCtx.Provider value={source}>
      <LarkMap {...(mapconfig as any)}>
        <PanelContainer />
        <Layer />
        {/* <PopupModal/> */}
      </LarkMap>
    </DataSourceCtx.Provider>
  );
};
