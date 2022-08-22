const MapConfig = {
  mapType: 'GaodeV1',
  mapOptions: {
    style: 'dark',
    center: [110.481623, 38.068625],
    zoom: 1,
  },
};

const LayerConfig = {
  autoFit: true,
  shape: 'arc3d',
  size: 1,
  blend: 'max',
  state: {
    active: false,
  },
  style: {
    opacity: 0.8,
    lineType: 'solid',
    sourceColor: '#f00',
    targetColor: '#f9f400',
  },
};

const LayerIconConfig = {
  autoFit: true,
  shape: 'arc3d',
  size: 0,
  blend: 'max',
  style: {
    opacity: 1,
    lineType: 'solid',
  },
  animate: {
    interval: 0.5,
    trailLength: 0.5,
    duration: 5,
  },
};

export { MapConfig, LayerConfig, LayerIconConfig };
