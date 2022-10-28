import type { LarkMapProps, ChoroplethLayerProps } from '@antv/larkmap';
import type { Feature } from '@turf/turf';
import { LarkMap, Scale, Zoom, ChoroplethLayer, CustomControl } from '@antv/larkmap';
import { Layout, Form, Spin, message, Popover } from 'antd';
import {
  RightOutlined,
  LeftOutlined,
  InfoCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { FullscreenBox } from '@alipay/tech-ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ConditionContent from '../ConditionContent';
import PanelContent from '../PanelContent';
import MyPopup from '../MyPopup';
import MyLegend from '../MyLegend';
import { randomNumBoth } from '../mock';
import { IcontrolsValues } from '../type';
import styles from './index.module.less';

const { Sider, Content, Header } = Layout;

const config: LarkMapProps = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'normal',
    doubleClickZoom: false, // 取消双击地图放大效果
    rotateEnable: false, // 右键点击拖动地图不能进行旋转地图
  },
  style: {
    height: 'calc(100vh - 50px)',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  logoPosition: 'bottomleft',
  logoVisible: true,
};

const SceneAnalysis = () => {
  // 筛选条件form实例
  const [controlsForm] = Form.useForm();
  // 图层数据
  const [layerData, setLayerData] = useState([]);
  // 侧边栏开启的状态
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // 地图加载状态
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  // 左上角筛选条件值
  const [controlsValues, setControlsValues] = useState<IcontrolsValues>({
    citySelect: ['330000', '330100'],
    areaSelect: '全部地区',
    brandSelect: '1',
  });
  // 选中的图层信息
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  // 图例数据
  const [legendValueArr, setLegendValueArr] = useState<Record<string, any>[]>([]);
  // 是否全屏展示
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const boxRef = useRef<FullscreenBox>();
  // 是否让侧边框变宽
  const [bigSider, setBigSider] = useState<boolean>(false);

  const selectFn = (ev: Feature) => {
    setSelectedFeatures([ev]);
  };
  const unselectFn = () => {
    setSelectedFeatures([]);
  };

  /** 区域图层属性配置 */
  const choroplethOptions: ChoroplethLayerProps = useMemo(() => {
    return {
      id: 'choroplethlayer',
      autoFit: true,
      fillColor: {
        field: 'unit_price',
        value: [
          '#37535E',
          '#3A748A',
          '#4B9A95',
          '#5EAB8B',
          '#73BC84',
          '#92CC8B',
          '#BEDDA5',
          '#E5EEc1',
        ].reverse(),
        scale: {
          type: 'quantile',
        },
      },
      opacity: 0.8,
      strokeColor: '#fff',
      lineWidth: 1,
      lineOpacity: 1,
      state: {
        active: { strokeColor: 'red', lineWidth: 1, lineOpacity: 0.8 },
        select: { strokeColor: 'green', lineWidth: 1, lineOpacity: 0.8 },
      },
      label: {
        field: 'name',
        visible: true,
        style: { fill: '#000', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
      },
      source: {
        data: layerData,
        parser: {
          type: 'geojson',
        },
      },
      blend: 'normal',
      onCreated: (layer) => {
        layer.on('select', selectFn);
        layer.on('unselect', unselectFn);

        layer.on('dblclick', (ev) => {
          message.info(ev?.feature?.properties?.name);
        });

        if (layer.getColorLegendItems()?.[0]?.value?.[1]) {
          setLegendValueArr(layer.getColorLegendItems());
        } else {
          setLegendValueArr([]);
        }
      },
    };
  }, [layerData]);

  const handleFullscreenChange = (fs: boolean) => {
    setFullscreen(fs);
  };
  const toggleFullscreen = () => {
    boxRef?.current?.changeFullscreen(!fullscreen);
  };

  useEffect(() => {
    setMapLoading(true);
    fetch(
      `https://gw.alipayobjects.com/os/antvdemo/assets/dipper-city/${controlsValues?.citySelect[1]}.json`,
    )
      .then((res) => res.json())
      .then((dataArr) => {
        const geoDataList = dataArr && {
          type: 'FeatureCollection',
          features: dataArr.features?.map((item: any) => {
            return {
              ...item,
              properties: {
                ...item.properties,
                brand_type: randomNumBoth(1, 4).toString(), // 添加充电宝品牌字段
              },
            };
          }),
        };

        if (controlsValues?.brandSelect && geoDataList) {
          const newArray =
            controlsValues?.brandSelect === '1'
              ? geoDataList
              : {
                  type: 'FeatureCollection',
                  features: geoDataList?.features?.filter(
                    (item: any) => item.properties.brand_type === controlsValues?.brandSelect,
                  ),
                };

          setLayerData(newArray ? newArray : []);
          setMapLoading(false);
          setSelectedFeatures([]);
        } else {
          setLayerData([]);
          setMapLoading(false);
          setSelectedFeatures([]);
        }
      })
      .catch(() => {
        setMapLoading(false);
        setSelectedFeatures([]);
      });
  }, [JSON.stringify(controlsValues?.citySelect), JSON.stringify(controlsValues?.brandSelect)]);

  // 右上角划过显示警告内容
  const warnContent = () => {
    return (
      <span>
        <InfoCircleOutlined
          style={{
            color: '#faad14',
            marginRight: 4,
          }}
        />
        以下数据纯属虚构，请注意以真实数据为准
      </span>
    );
  };

  return (
    <FullscreenBox ref={boxRef as any} onChange={handleFullscreenChange} header={false}>
      <Layout
        className={
          bigSider
            ? `${styles.mapArea} ${styles.mapAreaBigWidth}`
            : `${styles.mapArea} ${styles.mapAreaNormalWidth}`
        }
      >
        <Header className={styles.headerArea}>
          <div>场景分析</div>
          <div>
            {fullscreen ? (
              <FullscreenExitOutlined
                style={{
                  marginRight: 14,
                  cursor: 'pointer',
                }}
                onClick={() => toggleFullscreen()}
              />
            ) : (
              <FullscreenOutlined
                style={{
                  marginRight: 14,
                  cursor: 'pointer',
                }}
                onClick={() => toggleFullscreen()}
              />
            )}
            <Popover content={warnContent()} placement={'bottomRight'}>
              <span style={{ cursor: 'pointer' }}>
                <InfoCircleOutlined style={{ marginRight: 4 }} />
                以下数据纯属虚构
              </span>
            </Popover>
          </div>
        </Header>
        <Layout style={{ height: '100%' }}>
          {/* 左边地图部分 */}
          <Content>
            <Spin spinning={mapLoading}>
              <LarkMap {...config}>
                {/* 区域图层 */}
                <ChoroplethLayer {...choroplethOptions} />
                {/* 自定义组件-筛选条件 */}
                <CustomControl position={'topleft'}>
                  <ConditionContent
                    controlsForm={controlsForm}
                    controlsValues={controlsValues}
                    setControlsValues={setControlsValues}
                  />
                </CustomControl>
                {/* 自定义组件-图例 */}
                <CustomControl position={'bottomleft'}>
                  <MyLegend legendValueArr={legendValueArr} />
                </CustomControl>
                {/* 比例尺控件 */}
                <Scale position={'bottomright'} />
                {/* 缩放器控件 */}
                <Zoom position={'bottomright'} />
                {/* 信息框 */}
                <MyPopup />
              </LarkMap>
            </Spin>
          </Content>
          {/* 右侧panel */}
          <div className={styles.siderWrapper}>
            {/* 折叠按钮 */}
            <div className={styles.but} onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <LeftOutlined /> : <RightOutlined />}
            </div>
            <Sider
              className={styles.silderArea}
              collapsedWidth="0"
              trigger={null}
              collapsible
              theme="light"
              collapsed={collapsed}
            >
              <PanelContent
                selectedFeatures={selectedFeatures}
                controlsValues={controlsValues}
                bigSider={bigSider}
                setBigSider={setBigSider}
              />
            </Sider>
          </div>
        </Layout>
      </Layout>
    </FullscreenBox>
  );
};

export default SceneAnalysis;
