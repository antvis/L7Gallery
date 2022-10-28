import { DeleteOutlined, EnterOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { DataSourceCtx } from '../../context/DataSourceContext';
import { useScene, useLayerManager } from '@antv/larkmap';
import { centroid } from '@turf/turf';
import { Button, Divider, Empty, message } from 'antd';
import { layerMapping } from '../../config';

interface SourceLayerProps {
  setWidth: (val: number) => void;
}

export function SourceLayer(sourceLayers: SourceLayerProps) {
  const { setWidth } = sourceLayers;
  const layerManager = useLayerManager();
  const scene = useScene();
  const { dataSourceList, relationfield, setLoading, setDataSourceList, setRelationfield } =
    useContext(DataSourceCtx);

  const _setHandle = (item: any) => {
    setLoading(true);
    setWidth(250);
    setRelationfield(item);
    if (Array.isArray(item.sourceData.data)) {
      const newData = item.sourceData.data[0];
      const { x, y } = item.sourceData.parser;
      if (x && y && newData[x] && newData[y]) {
        scene.setCenter([+newData[x], +newData[y]]);
      }
    } else {
      const center = centroid(item.sourceData.data.features[0])?.geometry.coordinates;
      if (center) {
        scene.setCenter(center as [number, number]);
      }
    }
  };

  const _deleteHandle = (item: any) => {
    const newSource = dataSourceList.filter((d) => d.sourceId !== item.sourceId);
    setDataSourceList(newSource);
    const layer = layerManager.getLayer(item.sourceId);
    if (!layer) {
      message.warn('图层未创建,暂无法删除');
      return;
    }
    setWidth(0);
    layer.remove();
  };

  return (
    <div className={styles['list']}>
      {dataSourceList.map((item) => {
        const { sourceId, sourceName, sourceData } = item;
        return (
          <div key={uniqueId(sourceId)} className={styles.container}>
            <div
              className={styles['list-item-select']}
              style={{
                background: relationfield.sourceId === sourceId ? '#1890ff' : '#fff',
              }}
            />
            <div>
              <div className={styles['list-item']}>
                <div className={styles['list-item-source']}>{sourceName}</div>
                <div className={styles['list-item-tool']}>
                  <SettingOutlined onClick={() => _setHandle(item)} />
                  <Divider type="vertical" />
                  <DeleteOutlined onClick={() => _deleteHandle(item)} />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <EnterOutlined className={styles.enter} />
                <div style={{ fontSize: 12, color: '#999' }}>{`共${
                  Array.isArray(sourceData.data)
                    ? sourceData.data.length + 1
                    : sourceData.data.features.length + 1
                }条数据`}</div>
                {/*  @ts-ignore */}
                <div className={styles.type}>{layerMapping[item.layerType]}</div>
              </div>
            </div>
          </div>
        );
      })}
      {dataSourceList.length === 0 ? (
        <Empty
          style={{ marginTop: 30 }}
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              <Button type="link" size="small">
                暂无数据
              </Button>
            </span>
          }
        />
      ) : null}
    </div>
  );
}
