import React from 'react';

/* Libraries */
import { WordCloud } from '@ant-design/charts';

/* UI Library Components */
import { Badge } from 'antd';

/* Utilities */
import { useHistory } from 'react-router-dom';

const TinyWordCloudChart = React.memo(function ({ data, core }) {
  const history = useHistory();
  let config = {
    data: data,
    wordField: 'name',
    weightField: 'products',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [10, 22],
      rotation: 0,
    },
    height: 140,
    tooltip: {
      customContent: (title, datum) => {
        return (
          <>
            <h3 style={{ margin: '10px 0' }}>
              <Badge color={datum[0]?.color} />
              {datum[0]?.name}
            </h3>
            <h4>Productos: &emsp; {datum[0]?.data?.datum?.products}</h4>
            {datum[0]?.data?.datum?.citations ? (
              <h4>Citaciones: &emsp; {datum[0]?.data?.datum?.citations}</h4>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  };

  return (
    <WordCloud
      {...config}
      onReady={(plot) => {
        plot.on('plot:click', (evt) => {
          if (evt.data) {
            history.push(`/app/subjects?id=${evt.data.data.datum.id}`);
            core.setURL(`/app/subjects?id=${evt.data.data.datum.id}`);
          }
        });
      }}
    />
  );
});

export default TinyWordCloudChart;
