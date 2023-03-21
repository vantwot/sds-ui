import React from 'react';

/* UI Library Components */
import { Card } from 'antd';

/* Libraries */
import { Bar } from '@ant-design/charts';

/* Componentes */
/* import InfoButton from '../infoButton'; */

const BarChart = ({ data, title, height = 422, type }) => {
  let config = {
    data: data,
    xField: type,
    yField: 'name',
    seriesField: 'name',
    legend: {
      position: 'top-left',
    },
  };

  return (
    <Card
      size="small"
      title={title}
      headStyle={{ backgroundColor: '#003e65', color: 'white' }}
      bodyStyle={{ padding: '10px', height: height }}
      hoverable
      /*  extra={<InfoButton title={title} type={'citations'} />} */
    >
      <div className="chart">
        <Bar {...config} style={{ padding: '10px', height: '98%' }} />
      </div>
    </Card>
  );
};
export default BarChart;
