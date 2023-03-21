import React, { useEffect } from 'react';

/* Components */
import HomeTable from '../HomeTable';
import SearchBar from '../SearchBar';
import { ReactComponent as Banner } from '../../media/banner.svg';

/* UI Library Components */
import { Card, Col, Divider, Row, Typography } from 'antd';

/* Icons */
import { LinkOutlined } from '@ant-design/icons';

/* Charts */
import BogotaMapChart from '../charts/BogotaMapChart';
import { Link } from 'react-router-dom';

/* UI Library Sub-components*/
const { Title } = Typography;

const Home = ({ core }) => {
  useEffect(() => {
    document.title = 'SALUDATA';
    core.setHome(true);
    return () => {
      core.setHome(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Banner id="home__banner" />
      <Row justify="space-around" align="middle">
        <Col
          span={24}
          style={{ marginTop: '15px', marginBottom: 0, textAlign: 'center' }}
        >
          <Card size="small" bordered style={{ borderRadius: '10px' }}>
            <Title level={2}>Central de información científica</Title>
            <Title level={4}>
              Conozca la producción científica realizada en Bogotá sobre temas
              de interés en salud y bienestar. La información puede ser
              consultada por temas, productos, instituciones, grupos de
              investigación o autores.
            </Title>
            <div className="searchbar--container">
              <SearchBar core={core} />
            </div>
            <div id="home__table--container">
              <HomeTable />
            </div>
            <p style={{ textAlign: 'left', padding: '0 16px' }}>
              * Los indicadores aquí presentados buscan cumplir con los
              principios de métricas responsables, para mayor información por
              favor sigue este{' '}
              <Link
                to="/app/metrics"
                onClick={() => core.setURL('/app/metrics')}
              >
                enlace <LinkOutlined />
              </Link>
              .
            </p>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '60px' }}>
        <Col span={24}>
          <Divider
            id="home__divider--title"
            /* style={{ whiteSpace: 'break-spaces' }} */
          >
            Investigación en salud sobre el territorio
          </Divider>
        </Col>
      </Row>
      <Row justify="space-around" align="middle" style={{ marginTop: '15px' }}>
        <Col span={24}>
          <Title level={5}>
            Este mapa muestra un artículo seleccionado de manera aleatoria, cuyo
            lugar de análisis se corresponde con una localidad de Bogotá. Si
            está interesado en conocer más investigaciones sobre una localidad
            específica, ingrese al buscador y utilice el nombre de la localidad
            como palabra clave en la opción “Producto”.
          </Title>
        </Col>
        <Col span={24}>
          <BogotaMapChart />
        </Col>
      </Row>
    </>
  );
};

export default Home;
