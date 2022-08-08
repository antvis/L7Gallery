import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'L7Gallery',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  outputPath: 'docs-dist',
  devServer: {
    port: '3001',
  },
  mode: 'site',
  // more config: https://d.umijs.org/config
});
