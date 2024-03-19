import type {
  FeatureCollection,
  Geometry,
  GeometryCollection,
} from '@turf/helpers';
import simplify from '@turf/simplify';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import type {
  ChildrenDataOptions,
  DataLevel,
  DataPrecision,
  IDataOptions,
  ISourceOptions,
} from '../source/baseSource';
import BaseSource from './baseSource';

const DataConfig = {
  desc: {
    text: '锐多宝的地理空间',
    href: 'https://github.com/ruiduobao/shengshixian.com',
  },
  url: 'https://jsd.onmicrosoft.cn/npm/xingzhengqu',
  // url: 'https://unpkg.com/xingzhengqu',
};

const DataAccuracy: Record<DataPrecision, number> = {
  high: 0.000001,
  middle: 0.00001,
  low: 0.005,
};

const DataLevelRecord: Record<DataLevel, string> = {
  country: 'country',
  province: 'province',
  city: 'city',
  county: 'county',
  jiuduanxian: 'jiuduanxian',
};

// `https://unpkg.com/${version}/data/${code}.pbf`;
// http://npm.elemecdn.com/

export class RDBSource extends BaseSource {
  public info = DataConfig;
  protected getDefaultOptions(): Partial<ISourceOptions> {
    return {
      version: '2023',
    };
  }

  // 使用 Low 精度数据进行数据渲染
  public async getRenderData(
    options: Partial<IDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  > {
    return this.getData(options);
  }

  // 获取数据
  public async getData(
    options: Partial<IDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  > {
    const { level = 'country', type = 'wgs84' } = options;
    return (await this.fetchData(level, type)) as FeatureCollection<
      Geometry | GeometryCollection,
      Record<string, any>
    >;
    // return this.simplifyData(data, precision);
  }

  // 获取子级数据,数据下载时使用

  public async getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  > {
    const {
      parentAdcode,
      parentLevel,
      childrenLevel,
      precision = 'low',
    } = ChildrenDataOptions;

    const rawData = await this.getData({ level: childrenLevel, precision });
    let resultFeatures;
    if (parentAdcode && parentLevel && parentAdcode !== 100000) {
      resultFeatures = rawData.features.filter((feature) => {
        const key = `${parentLevel}_adcode`;
        const code = feature.properties[key];
        return code === parentAdcode;
      });
    }
    //TODO 根据 parentName, parenerLevel 进行数据过滤

    return {
      type: 'FeatureCollection',
      features: resultFeatures || [],
    };
  } /*  */

  private fetchArrayBuffer = async (url: string) => {
    const res = await fetch(url);
    return await res.arrayBuffer();
  };
  // 获取原始数据，数据解析并缓存
  private async fetchData(
    level: DataLevel,
    type: 'wgs84' | 'gcj02',
  ): Promise<FeatureCollection> {
    if (this.data[level]) {
      // ts-ignore
      return this.data[level] as FeatureCollection;
    }
    const url =
      +this.version >= 2024
        ? `${DataConfig.url}@${this.version}/data/${type}/${DataLevelRecord[level]}.pbf`
        : `${DataConfig.url}@${this.version}/data/${DataLevelRecord[level]}.pbf`;
    const data = await this.fetchArrayBuffer(url);
    const jsonData = geobuf.decode(new Pbf(data)) as FeatureCollection;
    this.data[level] = jsonData;
    return jsonData; // 原始数据
  }

  private simplifyData(
    data: FeatureCollection,
    precision: DataPrecision,
  ): FeatureCollection<Geometry | GeometryCollection, Record<string, any>> {
    return simplify(data, {
      tolerance: DataAccuracy[precision] as number,
      highQuality: false,
    }) as FeatureCollection<Geometry | GeometryCollection, Record<string, any>>;
  }
}
