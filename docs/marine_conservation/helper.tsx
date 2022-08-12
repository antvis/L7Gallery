const MapConfig = {
  mapType: 'GaodeV1',
  pitch: 90,
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
      'rgb(247,252,245)',
      'rgb(247,252,245)',
      'rgb(247,252,245)',
      'rgb(229,245,224)',
      'rgb(229,245,224)',
      'rgb(229,245,224)',
      'rgb(199,233,192)',
      'rgb(199,233,192)',
      'rgb(199,233,192)',
      'rgb(161,217,155)',
      'rgb(161,217,155)',
      'rgb(161,217,155)',
      'rgb(116,196,118)',
      'rgb(116,196,118)',
      'rgb(116,196,118)',
      'rgb(65,171,93)',
      'rgb(35,139,69)',
      'rgb(0,109,44)',
      'rgb(0,68,27)',
    ],
    scale: { type: 'quantile' },
  },
  size: {
    field: 'Area',
    value: ({ Area }) => {
      return 4 + Number(Area) / 1000;
    },
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
    opacity: 0.8,
    stroke: '#fff',
    strokeWidth: 0.2,
  },
  iconfont: true,
};

export { MapConfig, LayerConfig };
