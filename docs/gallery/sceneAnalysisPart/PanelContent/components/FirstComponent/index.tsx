import type { PieOptions } from '@antv/g2plot';
import { Pie } from '@antv/g2plot';
import { Spin } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Feature } from '@turf/turf';
import type { FC } from 'react';
import { marketShare } from '../../../mock';
import { IcontrolsValues } from '../../../type';

interface FirstComponentProps {
  controlsValues: IcontrolsValues;
  selectedFeatures: Feature[];
}

const FirstComponent: FC<FirstComponentProps> = ({ controlsValues, selectedFeatures }) => {
  const pieRef = useRef<Pie>();
  const [pData, setPData] = useState<{ yField: string; xField: number }[]>([]);
  const [pieLoading, setPieLoading] = useState(false);

  useEffect(() => {
    setPieLoading(true);
    if (controlsValues?.citySelect || controlsValues?.brandSelect) {
      setTimeout(() => {
        setPData(marketShare());
        setPieLoading(false);
      }, 700);
    } else {
      setPieLoading(false);
    }
  }, [
    JSON.stringify(controlsValues?.citySelect),
    JSON.stringify(controlsValues?.brandSelect),
    JSON.stringify(selectedFeatures),
  ]);

  const config: PieOptions = useMemo(() => {
    return {
      data: pData,
      height: 300,
      angleField: 'xField',
      colorField: 'yField',
      radius: 0.7,
      label: {
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{percentage}',
      },
      interactions: [{ type: 'element-active' }],
      legend: {
        position: 'bottom',
      },
    };
  }, [pData]);

  useEffect(() => {
    pieRef.current = new Pie('container1', config);
    pieRef.current.render();

    return () => {
      pieRef.current?.destroy();
    };
  }, [config]);

  return (
    <div style={{ marginBottom: 8 }}>
      <Spin spinning={pieLoading}>
        <div>行业市场份额</div>
        <div style={{ height: 300 }} id="container1" ref={pieRef as any} />
      </Spin>
    </div>
  );
};

export default FirstComponent;
