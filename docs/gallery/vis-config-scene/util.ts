import { FieldSelectOptionType } from '@antv/larkmap/es/components/LayerAttribute/types';
import { FeatureCollection } from '@turf/turf';
import { parse } from 'papaparse';

export function getFieldList(field: Record<string, any>): FieldSelectOptionType[] {
  const fileds = Object.keys(field)
    .map((item) => {
      return {
        type: typeof field[item],
        lable: item,
        value: item,
        typeColor: typeof field[item] === 'number' ? 'gold' : 'green',
        typeName: typeof field[item] === 'number' ? '数值' : '文本',
      };
    })
    .filter((item) => item.type !== 'object');
  return fileds;
}

export function parserData(content: string, ext: string) {
  let newData: any;
  if (ext === 'json' || ext === 'geojson') {
    newData = {
      data: content,
      parser: { type: 'geojson' },
    };
  }
  if (ext === 'csv') {
    const csvData = parse(content, { header: true, skipEmptyLines: true })?.data || [];
    newData = { data: csvData.slice(0, 10000), parser: { type: 'json' } };
  }
  return newData;
}

export function parseDataItem(ext: string, newData: any) {
  let geoData;
  if (ext === 'csv') {
    geoData = newData.data[0];
  } else {
    geoData = (newData.data as FeatureCollection).features[0].properties;
  }
  const newFields = getFieldList(geoData as Record<string, any>);
  return newFields;
}
