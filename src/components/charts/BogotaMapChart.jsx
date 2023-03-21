import React from 'react';

/* Components */
import DocumentModal from '../DocumentModal';

/* Libraries */
import { AreaMap } from '@ant-design/charts';

/* Utilities */
import { APIRequest } from '../../apis/api';

/* UI Library Components */
import { Modal, Spin } from 'antd';

const BogotaMapChart = ({ height = 600 }) => {
  const [state] = APIRequest('/app/home');
  const docInfo = (e) => {
    if (e.feature.properties.article.title.length > 0) {
      Modal.info({
        width: '1200px',
        title: (
          <p className="map--modal-title">
            {e.feature.properties.article.title}
          </p>
        ),
        icon: null,
        okText: 'Cerrar',
        maskClosable: true,
        content: <DocumentModal documentID={e.feature.properties.article.id} />,
        onOk() {},
      });
    } else
      Modal.info({
        width: '1200px',
        title: (
          <p className="map--modal-title">
            No hay artículos disponibles para esta localidad
          </p>
        ),
        icon: null,
        okText: 'Cerrar',
        maskClosable: true,
        content: '',
        onOk() {},
      });
  };

  if (state.isLoading) {
    return (
      <div className="spin--container">
        <Spin size="large" />
      </div>
    );
  }
  if (state.isError) {
    return null;
  }

  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
    },
    source: {
      data: state.data.data,
      parser: {
        type: 'geojson',
      },
    },
    autoFit: true,
    color: '#90cedc',
    style: {
      opacity: 1,
      stroke: '#f0f2f5',
      lineWidth: 2,
    },
    state: {
      active: { fill: '#4abfdc', stroke: 'white', lineWidth: 3 },
    },
    tooltip: {
      anchor: 'top-right',
      offsets: [60, -20],
      items: [{ field: 'article.title', alias: 'Artículo:' }],
    },
    label: {
      visible: true,
      field: 'loc',
      style: {
        fill: '#000',
        opacity: 0.9,
        fontSize: 11,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: true,
        padding: [10, 10],
      },
    },
    legend: {
      type: 'category',
      position: 'topright',
      title:
        'Haz click sobre una localidad para visualizar un artículo de forma aleatoria',
    },
  };

  const plotEvents = (plot) => {
    plot.on('areaLayer:click', (e) => docInfo(e));
  };

  return (
    <div className="map--chart">
      <div style={{ height: height, margin: '5px' }}>
        <AreaMap
          {...config}
          onReady={(plot) => {
            plotEvents(plot);
          }}
        />
      </div>
    </div>
  );
};

export default BogotaMapChart;
