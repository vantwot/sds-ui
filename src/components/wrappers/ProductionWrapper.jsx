import React from 'react';

/* Components */
import DocumentList from '../DocumentList';
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import DocumentByType from '../DocumentByType';

/* Charts */
import PieChart from '../charts/PieChart';
import VennChart from '../charts/VennChart';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { useLocation } from 'react-router';

/* UI Library Components */
import { Col, Row, Tabs } from 'antd';

/* UI Library Sub-components */
const { TabPane } = Tabs;

const ProductionWrapper = ({ core }) => {
  const location = useLocation();
  const [state] = APIRequest(
    `${location.pathname}${location.search}&data=production`
  );

  const tabMaker = (tabList) => {
    return (
      <Tabs defaultActiveKey="0" type="card" tabBarGutter={5}>
        {tabList.map((item, i) => (
          <TabPane tab={item} key={i}>
            <DocumentByType type={item} core={core} />
          </TabPane>
        ))}
      </Tabs>
    );
  };

  if (state.isError) {
    return <ErrorWarning />;
  }
  if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Row gutter={[15, 15]}>
      <Col xs={24} sm={24} md={12}>
        <PieChart
          data={state.data.open_access}
          title="Acceso Abierto"
          core={core}
        />
      </Col>
      <VennChart data={state.data.venn_source} core={core} />
      <Col span={24}>
        {state.data.types ? (
          tabMaker(state.data.types)
        ) : (
          <DocumentList data={state.data} core={core} />
        )}
      </Col>
    </Row>
  );
};

export default ProductionWrapper;
