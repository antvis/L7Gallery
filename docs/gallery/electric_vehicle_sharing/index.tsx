import {
  LarkMap,
  LarkMapProps,
  CustomControl,
  PointLayer,
  PointLayerProps,
  ChoroplethLayer,
  ChoroplethLayerProps,
} from '@antv/larkmap';
import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, Collapse } from 'antd';
import {
  tabList,
  pointLayerStyle,
  pointunAbleLayerStyle,
  pointDefaultLayerStyle,
  choroplethLayerStyle,
  SELECT_TYPE,
} from './contents';
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

  const [pointSelectData, setSelectPointData] = useState({
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

  // 类别选择
  const [selectType, setSelectType] = useState<string>();
  // 子项选择
  const [selectItem, setSelectItem] = useState<string>();

  const config = {
    mapType: 'GaodeV2',
    mapOptions: {
      center: [120.1492458, 30.2724425],
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
    } else {
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
    }
  };

  const onChangeItem = (e: string) => {
    setSelectItem(e);
    //子筛选项数据
    if (![SELECT_TYPE.POINTZONELESS, SELECT_TYPE.POINTZONEMORE].includes(e)) {
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
      setSelectPointData({ ...newdata });
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

  // 样式type
  const pointStyleType = useMemo(() => {
    switch (selectType) {
      case SELECT_TYPE.ALL:
      case SELECT_TYPE.BIKEAVAILABILITY:
        return pointunAbleLayerStyle;
      case SELECT_TYPE.BIKEUNAVAILABILITY:
        return pointDefaultLayerStyle;
      default:
        return pointLayerStyle;
    }
  }, [selectType]);

  // 子项样式
  const pointStleItemtype = useMemo(() => {
    switch (selectItem) {
      case SELECT_TYPE.BICKILLEGALPARKING:
      case SELECT_TYPE.BIKEAVAILABILITY:
        return pointunAbleLayerStyle;
      case SELECT_TYPE.BIKEUNAVAILABILITY:
      case SELECT_TYPE.BICKLOWERPOWER:
      case SELECT_TYPE.BICKTHEFAULT:
        return pointDefaultLayerStyle;
      default:
        return pointLayerStyle;
    }
  }, [selectItem]);

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
                {item.children(onChangeItem, selectItem)}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </CustomControl>

      <CustomControl className={styles['electric_vehicle_sharing-left']} position="topleft">
        <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="end">
          <Panel header="杭州市共享电单车分布情况" key="1">
            某某地点，共有电动自行车{pointZone.total}
            辆，其中低电量{pointbike.bikeLowpowerTotal}
            辆，故障车{pointbike.bikeTheFaultTotal}辆，违章停车{pointbike.bikeIllegalParking}辆，有
            720处停放点处于车辆过多情况， 166停放点处理车辆过少情况
          </Panel>
        </Collapse>
      </CustomControl>
      {/* 平常 */}
      <PointLayer {...(pointStyleType as unknown as PointLayerProps)} source={pointData} />
      {/* 故障 */}
      <PointLayer {...(pointStleItemtype as unknown as PointLayerProps)} source={pointSelectData} />

      {/* 区域图层数据 */}
      <ChoroplethLayer
        {...(choroplethLayerStyle as unknown as ChoroplethLayerProps)}
        source={PolygonData}
      />
    </LarkMap>
  );
};
