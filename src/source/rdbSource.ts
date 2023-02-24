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
  url: 'https://unpkg.com/xingzhengqu',
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
  district: 'county',
  jiuduanxian: 'jiuduanxian',
};

// `https://unpkg.com/${version}/data/${code}.pbf`;

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
    const { level = 'country', precision = 'low' } = options;
    const data = await this.fetchData(level);
    return this.simplifyData(data, precision);
  }

  // 获取子级数据,数据下载时使用

  public async getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  > {
    const {
      parentName,
      parentLevel,
      childrenLevel,
      shineUpon = {
        country: '',
        province: 'FIRST_GID',
        city: 'GID_1',
        district: 'GID_2',
      },
      precision = 'low',
    } = ChildrenDataOptions;
    const rawData = await this.getData({ level: childrenLevel, precision });
    //TODO 根据 parentName, parenerLevel 进行数据过滤
    if (shineUpon[parentLevel] && parentName) {
      const data = rawData.features.filter((v) => {
        return v.properties[shineUpon[parentLevel]] === parentName;
      });
      const newData = {
        type: 'FeatureCollection',
        features: data,
      } as FeatureCollection<
        Geometry | GeometryCollection,
        Record<string, any>
      >;
      return newData;
    }
    return rawData;
  } /*  */

  private fetchArrayBuffer = async (url: string) => {
    const res = await fetch(url);
    return await res.arrayBuffer();
  };
  // 获取原始数据，数据解析并缓存
  private async fetchData(
    level: DataLevel,
  ): Promise<
    FeatureCollection<Geometry | GeometryCollection, Record<string, any>>
  > {
    if (this.data[level]) {
      // ts-ignore
      return this.data[level];
    }
    const url = `${DataConfig.url}@${this.version}/data/${DataLevelRecord[level]}.pbf`;
    const data = await this.fetchArrayBuffer(url);
    const jsonData = await geobuf.decode(new Pbf(data));
    this.data[level] = await jsonData;
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