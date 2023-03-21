import React from 'react';

/* Libraries */
import { Column } from '@ant-design/plots';

const TinyColumnChart = React.memo(function ({ data }) {
  const config = {
    data: data,
    height: 140,
    xField: 'year',
    yField: 'products',
    seriesField: 'year',
    tooltip: {
      formatter: (datum) => {
        return {
          name: 'Productos',
          value: datum.products,
        };
      },
    },
  };

  return <Column {...config} />;
});

export default TinyColumnChart;
