const MapConfig = {
  mapType: 'GaodeV1',
  mapOptions: {
    style: 'light',
    center: [119.481623, 39.068625],
    zoom: 6,
  },
};

const LayerConfig = {
  shape: 'circle',
  blend: 'normal',
  textAllowOverlap: true,
  color: {
    field: 'Area',
    value: [
      'rgb(247, 252, 240)',
      'rgb(224, 243, 219)',
      'rgb(204, 235, 197)',
      'rgb(168, 221, 181)',
      'rgb(123, 204, 196)',
      'rgb(78, 179, 211)',
      'rgb(43, 140, 190)',
      'rgb(8, 104, 172)',
      'rgb(8, 64, 129)',
    ],
    scale: { type: 'quantile' },
  },
  size: {
    field: 'Area',
    value: [0, 2, 4, 6, 10, 16],
  },
  label: {
    field: 'ChineseName',
    visible: true,
  },
  highlightColor: '#f00',
  state: {
    active: true,
  },
  style: {
    opacity: 0.9,
    stroke: '#fff',
    strokeWidth: 0.2,
  },
  iconfont: true,
};

export { MapConfig, LayerConfig };
