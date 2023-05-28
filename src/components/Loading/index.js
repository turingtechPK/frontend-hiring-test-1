/* 
  Main loader for whole application
*/

import React from 'react';

// Antd
import { Spin, Space } from 'antd';

// Style
import './style.scss';

function Loading() {
  return (
    <Space className="loader" size="middle">
      <Spin size="large" />
    </Space>
  );
}

export default Loading;