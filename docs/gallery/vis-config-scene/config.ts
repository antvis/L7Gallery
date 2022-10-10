import { ChoroplethLayerProps } from '@antv/larkmap';

export const mapconfig = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'light',
    zoom: 6,
  },
  style: {
    height: '70vh',
    width: '100%',
  },
};

export const layerIcon = {
  BubbleLayer:
    'https://gw-office.alipayobjects.com/bmw-prod/636ac518-7c7a-4cfc-8201-54ab758974ff.jpg',
  ChoroplethLayer:
    'https://gw-office.alipayobjects.com/bmw-prod/4f11b2f3-faf4-4acb-93b8-90b4d59a6ad0.jpg',
  HeatmapLayer:
    'https://gw-office.alipayobjects.com/bmw-prod/c10261d4-b39e-40bc-b192-c60926728b3f.jpg',
  LineLayer:
    'https://gw-office.alipayobjects.com/bmw-prod/8490af50-5fde-4830-a822-a94eb8c65637.jpg',
};

export const options = [
  { title: '气泡图层', src: layerIcon.BubbleLayer, value: 'BubbleLayer' },
  { title: '区域图层', src: layerIcon.ChoroplethLayer, value: 'ChoroplethLayer' },
  { title: '热力图层', src: layerIcon.HeatmapLayer, value: 'HeatmapLayer' },
  { title: '线图层', src: layerIcon.LineLayer, value: 'LineLayer' },
];

export const layerMapping = {
  BubbleLayer: '气泡图层',
  ChoroplethLayer: '区域图层',
  HeatmapLayer: '热力图层',
  LineLayer: '线图层',
};

const colors = [
  'rgb(247, 251, 255)',
  'rgb(222, 235, 247)',
  'rgb(198, 219, 239)',
  'rgb(158, 202, 225)',
  'rgb(107, 174, 214)',
  'rgb(66, 146, 198)',
  'rgb(33, 113, 181)',
  'rgb(8, 81, 156)',
  'rgb(8, 48, 107)',
];

export const choropletStyle = (field: string) => {
  return {
    autoFit: true,
    fillColor: {
      field,
      value: colors,
    },
    opacity: 0.3,
    strokeColor: 'white',
    lineWidth: 1,
    lineOpacity: 1,
    label: {
      field,
      visible: true,
      style: { fill: '#333', fontSize: 12, textAnchor: 'center' as const },
    },
    fillBottomColor: 'red',
    enabledMultiSelect: true,
    state: {
      active: { strokeColor: 'green', lineWidth: 2, lineOpacity: 1 },
      select: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
    },
  };
};

export const lineStyle = (field: string) => {
  return {
    autoFit: true,
    color: {
      field,
      value: colors,
    },
    size: 1.5,
    style: {
      opacity: 0.8,
    },
  };
};

export const bubbleStyle = (field: string) => {
  return {
    autoFit: true,
    radius: 20,
    fillColor: 'orange',
    opacity: 0.4,
    strokeColor: 'white',
    lineWidth: 2,
    lineOpacity: 1,
    label: {
      field,
      visible: true,
      style: { fill: '#454d64', fontSize: 12, textAnchor: 'center' as const },
    },
  };
};

export const heatmapStyle = (field: string) => {
  return {
    autoFit: true,
    size: {
      field,
      value: [0, 1],
    },
    style: {
      intensity: 2,
      radius: 30,
      opacity: 1,
      rampColors: {
        colors: colors.reverse(),
        positions: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
      },
    },
  };
};
