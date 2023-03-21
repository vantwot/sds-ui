import React from 'react';

/* UI Library Components */
import { Card } from 'antd';

/* Libraries */
import { Column } from '@ant-design/charts';

/* Componentes */
import InfoButton from '../infoButton';

const ColumnChart = ({
  data,
  title,
  total,
  height = 420,
  type = 'citations',
}) => {
  let config_a = {
    data: data,
    appendPadding: [10, 10, 0, 10],
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    columnWidthRatio: 0.6,
    columnBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
    tooltip: {
      formatter: (datum) => {
        return {
          title: datum.type,
          name: 'Cantidad',
          value: datum.value,
        };
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
        style: { fontSize: 11 },
      },
    },
  };
  let config_b = {
    data: data,
    appendPadding: [20, 20, 0, 20],
    xField: 'year',
    yField: 'value',
    slider: { start: 0.0, end: 1 },
    columnWidthRatio: 0.6,
    columnBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
    tooltip: {
      formatter: (datum) => {
        return {
          title: `Año: ${datum.year}`,
          name: 'Citas',
          value: datum.value,
        };
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
  };

  let config = type === 'citations' ? config_b : config_a;

  return (
    <Card
      size="small"
      title={title}
      headStyle={{ backgroundColor: '#003e65', color: 'white' }}
      bodyStyle={{ padding: '10px', height: height }}
      hoverable
      extra={<InfoButton title={title} type={type} />}
    >
      <div className="chart">
        {type !== 'compendiumScholar' && (
          <p id="column__statistic">
            Total: <b>{total}</b>
          </p>
        )}
        <Column
          {...config}
          style={{ height: type === 'compendiumScholar' ? '99%' : '88%' }}
        />
      </div>
    </Card>
  );
};
export default ColumnChart;
