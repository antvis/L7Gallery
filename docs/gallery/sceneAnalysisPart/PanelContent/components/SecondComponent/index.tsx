import type { LineOptions } from '@antv/g2plot';
import { Line } from '@antv/g2plot';
import { Spin } from 'antd';
import type { Feature } from '@turf/turf';
import type { FC } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { brandRevenue } from '../../../mock';
import { IcontrolsValues } from '../../../type';

interface FirstComponentProps {
  controlsValues: IcontrolsValues;
  selectedFeatures: Feature[];
}

const SecondComponent: FC<FirstComponentProps> = ({ controlsValues, selectedFeatures }) => {
  const lineRef = useRef<Line>();
  const [lData, setLData] = useState<{ xField: string; series: string; yField: number }[]>([]);
  const [lineLoading, setLineLoading] = useState(false);

  const config: LineOptions = useMemo(() => {
    return {
      appendPadding: [8, 0, 8, 0],
      height: 300,
      data: lData,
      xField: 'xField',
      yField: 'yField',
      seriesField: 'series',
      legend: {
        position: 'bottom',
      },
      xAxis: {
        tickCount: 6,
      },
    };
  }, [lData]);

  useEffect(() => {
    setLineLoading(true);
    if (controlsValues?.citySelect || controlsValues?.brandSelect) {
      setTimeout(() => {
        setLData(brandRevenue());
        setLineLoading(false);
      }, 700);
    } else {
      setLineLoading(false);
    }
  }, [
    JSON.stringify(controlsValues?.citySelect),
    JSON.stringify(controlsValues?.brandSelect),
    JSON.stringify(selectedFeatures),
  ]);

  useEffect(() => {
    lineRef.current = new Line('container2', config);
    lineRef.current.render();

    return () => {
      lineRef.current?.destroy();
    };
  }, [config]);

  return (
    <div>
      <Spin spinning={lineLoading}>
        <div>各品牌营收</div>
        <div style={{ height: 300 }} id="container2" ref={lineRef as any} />
      </Spin>
    </div>
  );
};

export default SecondComponent;
