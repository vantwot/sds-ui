import React from 'react';

/* UI Library Components */
import { Card, Empty } from 'antd';

const EmptyCard = () => {
  return (
    <Card
      headStyle={{ backgroundColor: '#003e65', color: 'white' }}
      size="small"
      style={{
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Empty description={<span>Dato no disponible</span>} />
    </Card>
  );
};

export default EmptyCard;
