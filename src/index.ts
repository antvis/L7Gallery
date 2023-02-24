import { DataVSource } from './source/datavSource';
import { RDBSource } from './source/rdbSource';
export * from './source/baseSource';
export { default as BaseSource } from './source/baseSource';
export const DataSourceMap = {
  DataVSource,
  RDBSource,
};
export type SourceType = keyof typeof DataSourceMap;
