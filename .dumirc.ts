import { defineConfig } from 'dumi';
const isProduction = process.env.NODE_ENV === 'production';
export default defineConfig({
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  outputPath: 'docs-dist',
  copy: isProduction ? ['docs/CNAME'] : [],
  themeConfig: {
    name: '行政区数据',
    footer: false,
  },
});
