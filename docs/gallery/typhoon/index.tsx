import { LarkMap, LarkMapProps, LineLayer, LineLayerProps, PointLayer, Popup } from '@antv/larkmap';
import React, { useMemo, useState } from 'react';
import TyphoonOption from './content';
import { data } from './data';

const config = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'light',
    center: [131.3, 23.3],
    zoom: 6,
  },
};
const pointLayerOptions = {
  shape: 'circle',
  size: {
    field: 'movespeed',
    value: [6, 9],
  },
  blend: 'normal',
  color: {
    field: 'power',
    value: ['#588bf6', '#f8f92b', '#f8ab2b', '#f883f6'],
  },
  zIndex: 3,
  style: {
    stroke: '#000',
    strokeWidth: 1,
  },
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
  shape: 'line' as const,
  size: 1,
  color: '#5B8FF9',
  zIndex: 1,
};

export default () => {
  const [pointData, setPointData] = useState(data);
  const [popupInfo, setPopupInfo] = useState<Record<string, any> | null>(null);
  const [popupLatLng, setPopupLatLng] = useState<any>(null);
  const [isPopupInfo, setIsPopupInfo] = useState<boolean>(false);
  // useEffect(() => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/6f72e4f7-ac8c-41f6-bcac-9745100083ba.json')
  //     .then((res) => res.json())
  //     .then((data) => setPointData(data));
  // }, []);
  const lineSource = useMemo(() => {
    const lnglat = pointData.map((item) => {
      const { lng, lat } = item;
      return [+lng, +lat];
    });
    return [{ lnglat }];
  }, [pointData]);
  const onPointMouseenter = (e: any) => {
    setPopupInfo(e.feature);
    setIsPopupInfo(true);
  };
  console.log(popupLatLng);
  const guiJiLineData = useMemo(() => {
    if (popupLatLng) {
      return popupLatLng.forecast.map((item) => {
        return {
          lnglat: item.forecastpoints.map((v) => {
            return [+v.lng, +v.lat];
          }),
        };
      });
    } else {
      return [];
    }
  }, [popupLatLng]);
  const guiJiPointData = useMemo(() => {
    if (popupLatLng) {
      return popupLatLng.forecast
        .map((item) => {
          return item.forecastpoints.map((v) => {
            return { ...v, lat: +v.lat, lng: +v.lng };
          });
        })
        .flat();
    } else {
      return [];
    }
  }, [popupLatLng]);
  const setGuiJiData = (record) => {
    setPopupLatLng(record);
    setIsPopupInfo(true);
    setTimeout(() => {
      setIsPopupInfo(false);
    }, 1000);
  };
  console.log(guiJiPointData);
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '500px' }}>
      <PointLayer
        source={{
          data: pointData,
          parser: { type: 'json', x: 'lng', y: 'lat' },
        }}
        onCreated={(layer) => {
          layer?.on('mouseenter', onPointMouseenter);
          layer?.on('mouseout', () => {
            setPopupInfo(null);
            setIsPopupInfo(false);
          });
        }}
        {...pointLayerOptions}
      ></PointLayer>
      <LineLayer
        {...lineLayerOptions}
        source={{ data: lineSource, parser: { type: 'json', coordinates: 'lnglat' } }}
      />
      {(popupInfo || popupLatLng) && isPopupInfo && (
        <Popup
          lngLat={{ lng: (popupInfo ?? popupLatLng)?.lng, lat: (popupInfo ?? popupLatLng)?.lat }}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom-left"
        >
          <p>时间：{(popupInfo ?? popupLatLng).time}</p>
          <p>
            中心位置：{(popupInfo ?? popupLatLng).lng}°/{(popupInfo ?? popupLatLng).lat}°
          </p>
          <p>
            风速风力：{(popupInfo ?? popupLatLng).speed}米/秒,{(popupInfo ?? popupLatLng).power}
            级(台风)
          </p>
          <p>中心气压：{(popupInfo ?? popupLatLng).pressure}百帕</p>
          <p>
            移速移向：{(popupInfo ?? popupLatLng).movespeed}公里/小时,
            {(popupInfo ?? popupLatLng).movedirection}
          </p>
        </Popup>
      )}
      {guiJiPointData.length && (
        <PointLayer
          source={{
            data: guiJiPointData,
            parser: { type: 'json', x: 'lng', y: 'lat' },
          }}
          onCreated={(layer) => {
            layer?.on('mouseenter', onPointMouseenter);
            layer?.on('mouseout', () => {
              setPopupInfo(null);
              setIsPopupInfo(false);
            });
          }}
          {...pointLayerOptions}
          size={5}
          zIndex={2}
        ></PointLayer>
      )}
      {guiJiLineData && (
        <LineLayer
          {...lineLayerOptions}
          style={{ lineType: 'dash' }}
          source={{ data: guiJiLineData, parser: { type: 'json', coordinates: 'lnglat' } }}
        />
      )}
      <TyphoonOption setGuiJiData={setGuiJiData} />
    </LarkMap>
  );
};
