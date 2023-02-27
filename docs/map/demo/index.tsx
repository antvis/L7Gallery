/**
 * compact: true
 * inline: true
 */
import {
  CopyOutlined,
  DownloadOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import type { LayerPopupProps } from '@antv/larkmap';
import {
  ChoroplethLayer,
  LarkMap,
  LayerPopup,
  MapThemeControl,
} from '@antv/larkmap';
import { FeatureCollection } from '@turf/helpers';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Radio,
  Row,
  Select,
  Spin,
  Switch,
} from 'antd';
import type { BaseSource, DataLevel, SourceType } from 'district-data';
import { DataSourceMap } from 'district-data';
import React, { useEffect, useMemo, useState } from 'react';
import { downloadData, exportShpfile } from '../../utils/util';
import './index.less';
import {
  config,
  DataType,
  downloadDataType,
  editionOptions,
  item,
  layerOptions,
  sourceOptions,
} from './util';

interface IDataInfo {
  sourceType: SourceType;
  sourceVersion: string;
  currentName: string;
  currentLevel: DataLevel;
  currentCode: number;
  hasSubChildren: boolean;
  childrenLevel: DataLevel;
  datatype: DataType;
}

export default () => {
  const [layerSource, setLayerSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });
  const size = 'middle';
  const [dataInfo, setDataInfo] = useState<IDataInfo>({
    sourceType: 'RDBSource',
    sourceVersion: '2023',
    currentLevel: 'country',
    currentName: '中国',
    currentCode: 100000,
    hasSubChildren: true,
    childrenLevel: 'province',
    datatype: 'GeoJSON',
  });
  const [drillList, setDrillList] = useState<any[]>([
    {
      currentLevel: 'country',
      currentName: '中国',
      currentCode: 100000,
    },
  ]);
  const levelList = ['province', 'city', 'county'];
  const onDataConfigChange = (type: string, value: any) => {
    setDataInfo({
      ...dataInfo,
      [type]: value,
    });
  };
  const [dataSource, setDataSource] = useState<BaseSource>();

  const getDownloadData = async () => {
    const { currentLevel, hasSubChildren, childrenLevel, currentCode } =
      dataInfo;
    let data;
    if (!hasSubChildren) {
      // 没有子级,取父级数据
    } else {
      data = (await dataSource?.getChildrenData({
        parentLevel: currentLevel,
        parentAdcode: currentCode,
        childrenLevel: childrenLevel,
      })) as FeatureCollection;
    }
    return data;
  };

  const onDownload = async () => {
    const {
      datatype,
      currentLevel,
      hasSubChildren,
      childrenLevel,
      currentCode,
      currentName,
    } = dataInfo;
    let data;
    if (!hasSubChildren) {
      // 没有子级,取父级数据
    } else {
      data = (await dataSource?.getChildrenData({
        parentLevel: currentLevel,
        parentAdcode: currentCode,
        childrenLevel: childrenLevel,
      })) as FeatureCollection;
      if (datatype === 'Shapefiles') {
        exportShpfile(data, currentName);
      } else {
        downloadData(currentName, data, datatype);
      }
    }
  };
  const onDownloadSvg = async () => {
    const { currentName } = dataInfo;
    const data = (await getDownloadData()) as FeatureCollection;
    return downloadData(currentName, data, 'SVG');
  };

  // 切换数据源
  useEffect(() => {
    const { sourceType, sourceVersion } = dataInfo;
    const currentSource = new DataSourceMap[sourceType]({
      version: sourceVersion,
    });
    setDataSource(currentSource);
    // 初始化数据
    currentSource.getData({ level: 'province', code: 100000 }).then((data) => {
      setLayerSource((prevState: any) => ({
        ...prevState,
        data,
      }));
    });
  }, [dataInfo.sourceType, dataInfo.sourceVersion]);

  // 下钻
  const onDblClick = async (e: any) => {
    if (drillList.length === 3) {
      return;
    }
    const levelIndex = Math.min(
      levelList.indexOf(dataInfo.currentLevel) + 1,
      3,
    );
    const currentLevel = levelList[levelIndex] as DataLevel;
    const currentInfo = {
      currentLevel: currentLevel,
      currentName: e.feature.properties.name,
      currentCode: e.feature.properties.adcode,
    };
    setDrillList([...drillList, currentInfo]);
    setDataInfo({
      ...dataInfo,
      ...currentInfo,
    });
    const data = await dataSource?.getChildrenData({
      parentLevel: currentInfo.currentLevel,
      parentAdcode: currentInfo.currentCode,
      childrenLevel: levelList[levelIndex + 1] as DataLevel,
    });
    setLayerSource((prevState: any) => ({
      ...prevState,
      data,
    }));
  };

  const onUndblclick = async () => {
    const currentList = drillList.slice(0, drillList.length - 1);
    const currentInfo = currentList[currentList.length - 1];
    const currentLevel = dataInfo.currentLevel;

    setDataInfo({
      ...dataInfo,
      ...currentInfo,
    });
    setDrillList(currentList);

    const data = await dataSource?.getChildrenData({
      parentLevel: currentInfo.currentLevel,
      parentAdcode: currentInfo.currentCode,
      childrenLevel: currentLevel,
    });

    setLayerSource((prevState: any) => ({
      ...prevState,
      data,
    }));
  };

  const items: LayerPopupProps['items'] = useMemo(() => {
    return item();
  }, [dataInfo.sourceType, dataInfo.currentLevel]);

  return (
    <Spin spinning={false}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <LarkMap
          {...config}
          style={{
            height: 'calc(100vh - 180px)',
            width: 'calc(100% - 300px)',
          }}
        >
          <ChoroplethLayer
            {...layerOptions}
            source={layerSource}
            onDblClick={onDblClick}
            onUndblclick={onUndblclick}
            // onClick={onLayerClick}
            id="myChoroplethLayer"
          />
          <LayerPopup
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            trigger="hover"
            items={items}
          />
          <MapThemeControl position="bottomright" />
        </LarkMap>
        <div className="panel">
          <Row className="row">
            <Col span={4} className="label">
              数据源:
            </Col>
            <Col span={10}>
              <Select
                size={'small'}
                value={dataInfo.sourceType}
                style={{ width: '100%' }}
                onChange={onDataConfigChange.bind(null, 'sourceType')}
                options={sourceOptions}
              />
            </Col>
            <Col span={4} className="label">
              版本：
            </Col>
            <Col span={6}>
              <Select
                value={dataInfo.sourceVersion}
                size={'small'}
                onChange={onDataConfigChange.bind(null, 'sourceVersion')}
                options={editionOptions[dataInfo.sourceType]}
              />
            </Col>
          </Row>
          <Divider style={{ margin: '8px 0' }}></Divider>

          <Descriptions title="当前地区">
            <Descriptions.Item style={{ width: '160px' }} label="名称">
              {dataInfo.currentName}
            </Descriptions.Item>
            <Descriptions.Item label="adcode">
              {dataInfo.currentCode}
            </Descriptions.Item>
          </Descriptions>

          <Row className="row">
            <Col span={12} className="label">
              是否包含子区域:
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Switch
                style={{ width: '32px' }}
                checked={dataInfo.hasSubChildren}
                onChange={onDataConfigChange.bind(null, 'hasSubChildren')}
              />
            </Col>
          </Row>

          {dataInfo.hasSubChildren && (
            <Row className="row">
              <Col span={10} className="label">
                子区域级别:
              </Col>
              <Col span={14} style={{ textAlign: 'right' }}>
                <Radio.Group
                  defaultValue={dataInfo.childrenLevel}
                  size={size}
                  onChange={(e) => {
                    onDataConfigChange('childrenLevel', e.target.value);
                  }}
                >
                  <Radio.Button value="province">省</Radio.Button>
                  <Radio.Button value="city">市</Radio.Button>
                  <Radio.Button value="county">县</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          )}

          <Row className="row">
            <Col span={6} className="label">
              数据下载:
            </Col>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Select
                value={dataInfo.datatype}
                style={{ width: 120 }}
                size={size}
                options={downloadDataType}
                onChange={onDataConfigChange.bind(null, 'datatype')}
              />

              <Button
                type="primary"
                style={{ marginLeft: '8px' }}
                icon={<DownloadOutlined />}
                size={size}
                onClick={onDownload}
              />

              <Button
                type="primary"
                style={{ marginLeft: '8px' }}
                icon={<CopyOutlined />}
                size={size}
              />
            </Col>
          </Row>
          <Row className="row">
            <Col span={6} className="label">
              SVG下载:
            </Col>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Button style={{ pointerEvents: 'none', width: 120 }}>
                {' '}
                <PictureOutlined /> SVG{' '}
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: '8px' }}
                icon={<DownloadOutlined />}
                size={size}
                onClick={onDownloadSvg}
              />

              <Button
                type="primary"
                style={{ marginLeft: '8px' }}
                icon={<CopyOutlined />}
                size={size}
              />
            </Col>
          </Row>
          <Row className="row"></Row>

          <div className="originData" style={{}}>
            <div>数据来源：</div>
            <a
              href={`${dataSource?.info?.desc?.href}`}
            >{`${dataSource?.info?.desc?.text}`}</a>
          </div>
        </div>
      </div>
    </Spin>
  );
};
