import { Popup, useLayerManager } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

export function PopupModal() {
  const layerManager = useLayerManager();
  const layers = layerManager.getLayers();
  const [popupInfo, setPopupInfo] = useState<any>({});

  const _handlePopup = (ev: any) => {
    const { lngLat, feature } = ev;
    const info = Object.keys(feature?.properties || {}).map((item) => {
      const val = feature?.properties[item];
      return {
        key: item,
        value: typeof val === 'object' ? JSON.stringify(val) : val,
      };
    });
    setPopupInfo({ info, lnglat: lngLat });
  };

  useEffect(() => {
    console.log('------->', layers);
    if (layers.length) {
      layers.forEach((item) => {
        item?.on('mousemove', (ev) => _handlePopup(ev));
        item?.on('mouseout', (ev) => _handlePopup(ev));
      });
    }
    () => {
      if (layers.length) {
        layers.forEach((item) => {
          item?.destroy();
        });
      }
    };
  }, [layers]);

  return (
    <div>
      {Object.keys(popupInfo).length ? (
        <Popup lngLat={popupInfo?.lnglat as any} anchor="bottom-left" closeButton={false}>
          {(popupInfo.info || []).slice(0, 5).map((item: any) => {
            return (
              <div key={Math.random()} className={styles.info}>
                <div>{item.key}:</div>
                <div className={styles.value}>{item.value}</div>
              </div>
            );
          })}
        </Popup>
      ) : null}
    </div>
  );
}
