import { defineConfig } from 'dumi';
const isProduction = process.env.NODE_ENV === 'production';
export default defineConfig({
  logo: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uQbXRLw_Q2UAAAAAAAAAAAAADmJ7AQ/original',
  outputPath: 'docs-dist',
  copy: isProduction ? ['docs/CNAME'] : [],
  themeConfig: {
    name: 'GISDATA',
    footer: false,
  },
});
