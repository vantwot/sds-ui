import React from 'react';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { useLocation } from 'react-router';

/* Components */
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import CoauthorsList from '../CoauthorsList';

/* Charts */
import MapChart from '../charts/MapChart';
import GraphChart from '../charts/GraphChart';

/* UI Library Components */
import { Col, Row } from 'antd';

const CoauthorsWrapper = ({ core }) => {
  const location = useLocation();
  const [state] = APIRequest(
    `${location.pathname}${location.search}&data=coauthors`
  );

  if (state.isError) {
    return <ErrorWarning />;
  }
  if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Row gutter={[15, 15]}>
      <Col xs={24} md={8}>
        <CoauthorsList
          data={state.data.data.coauthors || state.data.data.institutions}
          title="Lista de Coautores"
          height={600}
          core={core}
        />
      </Col>
      <Col xs={24} md={16}>
        <MapChart
          data={state.data.data.geo}
          title="Alcance Geográfico"
          height={600}
          type="coauthorsMap"
        />
      </Col>
      <Col span={24}>
        {state.data.data.coauthors_network && (
          <GraphChart
            data={state.data.data.coauthors_network}
            title="Red de coautoría - Autores"
            type="authors"
          />
        )}
      </Col>
    </Row>
  );
};

export default CoauthorsWrapper;
