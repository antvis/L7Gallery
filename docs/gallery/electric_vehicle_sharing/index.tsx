import { LarkMap, LarkMapProps, CustomControl } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { Tabs, Collapse } from 'antd';
import { DownOutlined, UpOutlined, AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import styles from './index.module.less';

import { tabList } from './contents';
const { Panel } = Collapse;

export default () => {
  const [pointData, setPointData] = useState({
    data: [],
    parser: { type: 'geojson' },
    cluster: true,
    clusterOption: {
      radius: 5,
    },
  });
  const [PolygonData, setPolygonData] = useState({
    data: [],
    parser: { type: 'geojson' },
  });
  const config = {
    mapType: 'GaodeV2',
    mapOptions: {
      center: [120.210792, 30.246026],
      zoom: 0,
    },
  };

  const fetchPointData = async () => {
    const res = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/b75db584-b143-491d-83cc-cb45653cd4ed.json',
    );
    const result = await res.json();
    setPointData({ ...pointData, data: result });
  };

  const fetchPolygonData = async () => {
    const res = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/163c9fbb-546f-407e-beb1-cc48fdfc2613.json',
    );
    const result = await res.json();
    setPolygonData({ ...PolygonData, data: result });
  };

  useEffect(() => {
    fetchPointData();
    fetchPolygonData();
  }, []);

  return (
    <LarkMap
      {...(config as LarkMapProps)}
      className={styles['electric_vehicle_sharing']}
      style={{ height: '700px' }}
    >
      <CustomControl className={styles['electric_vehicle_sharing-right']} position="topright">
        <Tabs>
          {tabList.map((item) => {
            return (
              <Tabs.TabPane tab={item.label} key={item.key}>
                {item.children}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </CustomControl>
      <CustomControl className={styles['electric_vehicle_sharing-left']} position="topleft">
        <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="end">
          <Panel header="杭州市共享电单车分布情况" key="1">
            <p>dfkgdfklgdfj</p>
          </Panel>
        </Collapse>
      </CustomControl>
    </LarkMap>
  );
};
