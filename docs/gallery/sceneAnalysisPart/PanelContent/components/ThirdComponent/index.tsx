import { Empty } from 'antd';
import React from 'react';

const ThirdComponent = () => {
  return (
    <div>
      <div style={{ marginTop: 40 }}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />
      </div>
    </div>
  );
};

export default ThirdComponent;
