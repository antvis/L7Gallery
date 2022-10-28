import { Popup, useLayer } from '@antv/larkmap';
import type { ILngLat } from '@antv/l7';
import React, { useEffect, useState } from 'react';

const MyPopup = () => {
  /** https://larkmap.antv.vision/components/lark-map/hooks/use-layer/use-layer#%E4%BB%8B%E7%BB%8D */
  const choroplethlayer = useLayer('choroplethlayer');
  const [lngLat, setLngLat] = useState({});
  const [popupInfo, setPopupInfo] = useState('');

  const moveFn = (ev: any) => {
    setLngLat(ev?.lngLat);
    setPopupInfo(ev?.feature?.properties?.name);
  };
  const outFn = () => {
    setLngLat({});
    setPopupInfo('');
  };

  useEffect(() => {
    choroplethlayer?.off('mousemove', moveFn);
    choroplethlayer?.off('mouseout', outFn);

    choroplethlayer?.on('mousemove', moveFn);
    choroplethlayer?.on('mouseout', outFn);

    return () => {
      if (choroplethlayer) {
        choroplethlayer?.off('mousemove', moveFn);
        choroplethlayer?.off('mouseout', outFn);
      }
    };
  }, [choroplethlayer]);

  return (
    <div>
      {Object.keys(lngLat)?.length && (
        <Popup lngLat={lngLat as ILngLat} closeButton={false} closeOnClick={false} anchor="bottom">
          <p style={{ color: '#000' }}>{popupInfo}</p>
        </Popup>
      )}
    </div>
  );
};

export default MyPopup;
