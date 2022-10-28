import type { FC } from 'react';
import React, { useMemo } from 'react';
import { Avatar } from 'antd';
import ldh from 'lodash';
import styles from './index.module.less';

interface MyLegendProps {
  legendValueArr?: Record<string, any>[] | undefined;
}
interface IlegendContentArr {
  color?: string;
  value?: any[];
}

const MyLegend: FC<MyLegendProps> = ({ legendValueArr }) => {
  const legendContentArr: IlegendContentArr[] | undefined = useMemo(() => {
    return legendValueArr?.map((legendItem) => {
      return {
        ...legendItem,
        value: legendItem?.['value']?.[1]
          ? [
              ldh.round(Number(legendItem?.['value']?.[0]) / 10000, 2),
              ldh.round(Number(legendItem?.['value']?.[1]) / 10000, 2),
            ]
          : legendItem?.['value'],
      };
    });
  }, [legendValueArr]);

  return (
    <div>
      {legendContentArr?.length ? (
        <div className={styles.myLegendWrapper}>
          <div className={styles.legendTitle}>充电宝投放数量(万)</div>
          {legendContentArr?.map((itemLegend) => {
            return (
              <div className={styles.rowItem} key={itemLegend?.color}>
                <Avatar
                  shape={'square'}
                  size={'small'}
                  style={{
                    background: itemLegend?.color,
                    width: 14,
                    height: 14,
                  }}
                />
                <span
                  style={{
                    color: '#000',
                    marginLeft: 4,
                    fontSize: 12,
                  }}
                >
                  {itemLegend?.value?.[1] ? itemLegend?.value?.join(' ~ ') : null}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MyLegend;
