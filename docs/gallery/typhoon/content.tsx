import { CustomControl } from '@antv/larkmap';
import { Table } from 'antd';
import React from 'react';
import { data } from './data';

interface Props {
  setGuiJiData: any;
}

const columns = [
  {
    dataIndex: 'time',
    title: '时间',
    width: 100,
    key: 'time',
  },
  {
    dataIndex: 'pressure',
    title: '气压',
    key: 'pressure',
  },
  {
    dataIndex: 'power',
    title: '风力',
    key: 'power',
  },
  {
    dataIndex: 'movespeed',
    title: '移速',
    key: 'movespeed',
  },
];

const TyphoonOption = ({ setGuiJiData }: Props) => {
  return (
    <CustomControl
      position="topright"
      style={{
        background: '#fff',
        width: '300px',
        padding: '10px',
        height: '300px',
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 220 }}
        onRow={(record) => {
          return {
            onClick: () => {
              setGuiJiData(record);
            }, // 点击行
          };
        }}
      />
    </CustomControl>
  );
};
export default TyphoonOption;
