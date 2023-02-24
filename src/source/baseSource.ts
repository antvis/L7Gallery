import type {
  FeatureCollection,
  Geometry,
  GeometryCollection,
} from '@turf/helpers';

export interface ISourceOptions {
  dataInfo?: string;
  version: string;
}

export type DataPrecision = 'high' | 'middle' | 'low';
export interface IDataOptions {
  precision: DataPrecision;
  level: DataLevel;
  code: number;
  full: boolean;
}

export interface ChildrenDataOptions {
  parentName: number;
  parentLevel: DataLevel;
  childrenLevel: DataLevel;
  precision: DataPrecision;
  shineUpon: Record<string, string>;
  full: boolean;
}

export type DataLevel =
  | 'country'
  | 'province'
  | 'city'
  | 'district'
  | 'jiuduanxian';
export interface ISourceInfo {
  url: string;
  desc: {
    text: string;
    href: string;
  };
}
export default abstract class BaseSource {
  public info: Partial<ISourceInfo> = {};
  private options: Partial<ISourceOptions> = {};
  protected data: {
    [K in DataLevel]: FeatureCollection | undefined;
  } = {
    country: undefined,
    province: undefined,
    city: undefined,
    district: undefined,
    jiuduanxian: undefined,
  };
  protected version: string;

  constructor(options: Partial<ISourceOptions>) {
    this.options = {
      ...this.getDefaultOptions(),
      ...options,
    };
    this.version = this.options.version || 'default';
  }

  protected abstract getDefaultOptions(): Partial<ISourceOptions>;

  // 获取渲染数据
  public abstract getRenderData(
    options: Partial<IDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  >;

  // 根据精度, level 获取下载数据
  public abstract getData(
    options: Partial<IDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  >;

  // 获取子级数据
  public abstract getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  >;

  protected fetchJsonData = async (url: string) => {
    const res = await fetch(url);
    return await res.json();
  };
}
