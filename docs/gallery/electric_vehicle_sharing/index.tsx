import {
  LarkMap,
  LarkMapProps,
  CustomControl,
  PointLayer,
  PointLayerProps,
  ChoroplethLayer,
  ChoroplethLayerProps,
} from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { Tabs, Collapse } from 'antd';
import { tabList, pointLayerStyle, choroplethLayerStyle, SELECT_TYPE } from './contents';
import styles from './index.module.less';
import { pointZone } from './mock/pointZone';
import { pointbike } from './mock/pointbike';

const { Panel } = Collapse;

export default () => {
  const [pointData, setPointData] = useState({
    data: {},
    parser: { type: 'geojson' },
    cluster: true,
    clusterOption: {
      radius: 5,
    },
  });
  const [PolygonData, setPolygonData] = useState({
    data: {},
    parser: { type: 'geojson' },
  });

  const [selectType, setSelectType] = useState<string>();
  const config = {
    mapType: 'GaodeV2',
    mapOptions: {
      center: [120.1514132, 30.2725324],
      zoom: 0,
    },
  };

  useEffect(() => {
    setPointData({ ...pointData, data: pointbike });
    setPolygonData({ ...PolygonData, data: pointZone });
  }, []);

  const onChangeType = (e: string) => {
    setSelectType(e);
    if (e === SELECT_TYPE.ALL) {
      setPointData({ ...pointData, data: pointbike });
      setPolygonData({ ...PolygonData, data: pointZone });
    } else if (![SELECT_TYPE.POINTZONELESS, SELECT_TYPE.POINTZONEMORE].includes(e)) {
      // 停车地点进行筛选数据
      const newPoint = pointbike?.features?.filter((item) => {
        if (item.properties[e]) {
          return item;
        }
      });
      const newdata = {
        ...pointData,
        data: { type: 'FeatureCollection', features: newPoint },
      };
      setPointData({ ...newdata });
    } else {
      // 区域数据的筛选
      const newZone = pointZone.features.filter((item) => {
        // 少
        if (e === SELECT_TYPE.POINTZONELESS) {
          if (item.properties.bikeNumber < 5) {
            return item;
          }
        } else {
          if (item.properties.bikeNumber >= 5) {
            return item;
          }
        }
      });

      const newdata = {
        ...PolygonData,
        data: { type: 'FeatureCollection', features: newZone },
      };

      setPolygonData({ ...newdata });
    }
  };

  return (
    <LarkMap
      {...(config as LarkMapProps)}
      className={styles['electric_vehicle_sharing']}
      style={{ height: '700px' }}
    >
      <CustomControl className={styles['electric_vehicle_sharing-right']} position="topright">
        <Tabs onChange={onChangeType}>
          {tabList.map((item) => {
            return (
              <Tabs.TabPane tab={item.label} key={item.key}>
                {item.children(onChangeType, selectType)}
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

      <PointLayer {...(pointLayerStyle as unknown as PointLayerProps)} source={pointData} />
      {/* 区域图层数据 */}
      <ChoroplethLayer
        {...(choroplethLayerStyle as unknown as ChoroplethLayerProps)}
        source={PolygonData}
      />
    </LarkMap>
  );
};
