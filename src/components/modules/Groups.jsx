import React, { useEffect } from 'react';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { useLocation } from 'react-router';

/* Components */
import AuthorsTab from '../AuthorsTab';
import CoauthorsWrapper from '../wrappers/CoauthorsWrapper';
import CommonTitleCard from '../CommonTitleCard';
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import ProductionWrapper from '../wrappers/ProductionWrapper';
import SubjectsWrapper from '../wrappers/SubjectsWrapper';

/* UI Library Components */
import { Col, Row, Tabs } from 'antd';

/* UI Library Sub-components */
const { TabPane } = Tabs;

const Groups = ({ core }) => {
  const location = useLocation();
  let URL = location.pathname + location.search;
  const [state, setUrl] = APIRequest(`${URL}&data=info`);

  useEffect(() => {
    document.title = 'Grupos | SALUDATA';
  }, []);

  useEffect(() => {
    setUrl(`${URL}&data=info`);
    core.setFilters(state.data.filters);
    return () => {
      core.setFilters(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL, state]);

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Row gutter={[15, 15]}>
      <CommonTitleCard core={core} data={state.data.data} />
      <Col span={24}>
        <Tabs defaultActiveKey={'topics'} type="card" tabBarGutter={5}>
          <TabPane tab="Temas" key="topics">
            <SubjectsWrapper core={core} />
          </TabPane>
          <TabPane tab="Producción" key="production" forceRender>
            <ProductionWrapper core={core} />
          </TabPane>
          <TabPane tab="Autores" key="authors" forceRender>
            <AuthorsTab core={core} />
          </TabPane>
          <TabPane tab="Coautorías" key="coauthors">
            <CoauthorsWrapper core={core} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Groups;
