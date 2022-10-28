// @ts-ignore
import Mock from 'mockjs';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

// 生成范围内的随机数
export const randomNumBoth = (min: number, max: number) => {
  const Range = max - min;
  const Rand = Math.random();
  const num = min + Math.round(Rand * Range);
  return num;
};

export const cityOptions: Option[] = [
  {
    label: '浙江省',
    value: '330000',
    children: [{ label: '杭州市', value: '330100' }],
  },
  {
    label: '北京市',
    value: '110000',
    children: [{ label: '北京市', value: '110000' }],
  },
  {
    label: '天津市',
    value: '120000',
    children: [{ label: '天津市', value: '120000' }],
  },
  {
    label: '上海市',
    value: '310000',
    children: [{ label: '上海市', value: '310000' }],
  },
  {
    label: '河北省',
    value: '130000',
    children: [
      { label: '石家庄市', value: '130100' },
      { label: '廊坊市', value: '131000' },
    ],
  },
  {
    label: '广东省',
    value: '440000',
    children: [
      { label: '广州市', value: '440100' },
      { label: '深圳市', value: '440300' },
      { label: '珠海市', value: '440400' },
      { label: '佛山市', value: '440600' },
      { label: '惠州市', value: '441300' },
      { label: '东莞市', value: '441900' },
      { label: '中山市', value: '442000' },
    ],
  },
];
export const areaOptions = [
  { label: '全部地区', value: '全部地区', key: '全部地区' },
  { label: '示例地区1', value: '示例地区1', key: '示例地区1' },
  { label: '示例地区2', value: '示例地区2', key: '示例地区2' },
];
export const brandTypeOptions = [
  { label: '全部类型', value: '1', key: '1' },
  { label: '街电', value: '2', key: '2' },
  { label: '怪兽', value: '3', key: '3' },
  { label: '小电', value: '4', key: '4' },
];

// 行业市场份额
export const marketShare = () => {
  const data = Mock.mock({
    'list|3': [
      {
        // 生成长度在 100~1000 之间的小写字母
        xField: '@integer(0,100)',
      },
    ],
  });
  const yField = ['街电', '怪兽', '小电'];
  return data.list
    .sort((a: any, b: any) => a.yField - b.yField)
    .map((item: any, index: number) => {
      return {
        yField: yField[index],
        ...item,
      };
    });
};
// 各品牌营收
export const brandRevenue = () => {
  const series = ['街电', '来电', '怪兽', '美团', '小电'];
  const xField = new Array(11).fill('').map((item, index) => {
    return `${2009 + index}`;
  });

  return series
    .map((a, k) => {
      return xField.map((b, index) => {
        return {
          xField: b,
          series: a,
          yField: Number(((index + 1) * 10 + 30 * Math.random() + k * 20).toFixed()),
        };
      });
    })
    .flat();
};

/** 地址搜索 */
export const addressOption = () => {
  const data = Mock.mock({
    'list|10': [
      {
        label: '@county(true)',
        staffNo: '@integer(100000,1000000)',
        value: '@integer(100000,1000000)',
      },
    ],
  });
  return data.list;
};
