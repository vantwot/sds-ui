import React, { useEffect } from 'react';

/* UI Library */
import { Col, Divider, Row, Typography } from 'antd';

/* Media */
import logo_ODS from '../../media/logo_ODS.svg';
import title_ODS from '../../media/title_ODS.svg';

/* Charts */
import Infographic from '../charts/Infographic';
import ODSInfographic from '../charts/ODSInfographic';

/* Utilities */
import { APIRequest } from '../../apis/api';

/* Components */
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import CallToActionTrends from '../CallToActionTrends';
import TrendsTreeSelect from '../TrendsTreeSelect';

/* UI Library Sub-components */
const { Title } = Typography;

const Trends = ({ core }) => {
  const [state] = APIRequest('/app/trends?data=info');

  useEffect(() => {
    document.title = 'SALUDATA | Tendencias';
  }, []);

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <>
      <Divider className="trends-divider">
        Objetivos de Desarrollo Sostenible
      </Divider>
      <Row
        justify="space-between"
        align="middle"
        style={{ backgroundColor: '#4c9f38', minHeight: '150px' }}
      >
        <Col xs={24} md={6} lg={4} style={{ padding: '35px' }}>
          <img src={title_ODS} alt="Salud y Bienestar" />
        </Col>
        <Col xs={24} md={10} lg={10}>
          <Title level={2} style={{ textAlign: 'center', color: 'white' }}>
            “Garantizar una vida sana y promover el bienestar de todos a todas
            las edades.”
          </Title>
        </Col>
        <Col
          xs={0}
          md={6}
          lg={4}
          style={{ marginRight: '35px', textAlign: 'right' }}
        >
          <img src={logo_ODS} alt="Logo ODS 3" id="logo__ods" />
        </Col>
      </Row>
      <br />
      <Row gutter={[15, 15]} align="middle" justify="center">
        <ODSInfographic core={core} data={state.data.ODS} />
      </Row>
      <Divider style={{ marginTop: '35px' }} className="trends-divider">
        Covid-19
      </Divider>
      <Row
        justify="space-around"
        align="middle"
        gutter={[70, 30]}
        style={{ width: '100%', marginTop: '50px' }}
      >
        <Col xs={24} lg={10}>
          <Infographic
            title="COVID-19"
            productsValue={state.data.covid.products}
            authorsValue={state.data.covid.authors}
            groupsValue={state.data.covid.groups}
            institutionsValue={state.data.covid.institutions}
          />
        </Col>
        <Col xs={24} lg={14}>
          <Title style={{ fontSize: '42px', fontWeight: 700 }}>
            Indicadores sobre producción generada en Bogotá sobre Covid 19.
          </Title>
          <CallToActionTrends
            core={core}
            id={state.data.covid.id}
            type="covid"
          />
        </Col>
      </Row>
      <Divider style={{ marginTop: '35px' }} className="trends-divider">
        Plan Territorial de Salud
      </Divider>
      <Row
        align="top"
        gutter={[20, 20]}
        style={{ width: '100%', marginLeft: 0, marginRight: 0 }}
      >
        <Col xs={24} lg={10}>
          <Infographic
            title="PTS"
            productsValue={state.data.PTS.products}
            authorsValue={state.data.PTS.authors}
            groupsValue={state.data.PTS.groups}
            institutionsValue={state.data.PTS.institutions}
          />
          <CallToActionTrends core={core} id={state.data.PTS.id} type="pts" />
        </Col>
        <Col xs={24} lg={14}>
          <TrendsTreeSelect data={state.data.PTS.tree} core={core} />
        </Col>
      </Row>
      <Divider style={{ marginTop: '35px' }} className="trends-divider">
        Plan Distrital de Desarrollo
      </Divider>
      <Row
        align="top"
        gutter={[20, 20]}
        style={{
          width: '100%',
          marginLeft: 0,
          marginRight: 0,
          marginBottom: '50px',
        }}
      >
        <Col xs={24} lg={10}>
          <Infographic
            title="PDD"
            productsValue={state.data.PDD.products}
            authorsValue={state.data.PDD.authors}
            groupsValue={state.data.PDD.groups}
            institutionsValue={state.data.PDD.institutions}
          />
          <CallToActionTrends core={core} id={state.data.PDD.id} type="pdd" />
        </Col>
        <Col xs={24} lg={14}>
          <TrendsTreeSelect data={state.data.PDD.tree} core={core} />
        </Col>
      </Row>
    </>
  );
};

export default Trends;
