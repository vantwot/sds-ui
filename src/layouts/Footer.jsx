import React from 'react';

/* UI Library Components */
import { Layout, Col, Row, Divider } from 'antd';

/* logotypes */
import logo_sds_w from '../media/logo_sds_w.svg';

/* Utilities */
import { Link } from 'react-router-dom';

const Footer = ({ core }) => {
  return (
    <Layout.Footer id="footer">
      <Row gutter={[15, 15]} align="middle">
        <Col xs={24} md={12} xxl={6}>
          <div className="footer-container">
            <p>
              <b>Módulo de Investigación en Salud</b>
            </p>
            <br />
            <p>
              <a
                href="/sds_api/app/techdocs?file=Manual%20de%20Usuario.pdf"
                className="white--link"
              >
                Manual de usuario
              </a>
            </p>
            <p>
              <Link
                to="/app/regulations"
                className="white--link"
                onClick={() => core.setURL('/app/regulations')}
              >
                Normatividad del sistema de investigación en salud
              </Link>
            </p>
            <p>
              <Link
                to="/app/techdocs"
                className="white--link"
                onClick={() => core.setURL('/app/techdocs')}
              >
                Fichas Técnicas
              </Link>
            </p>
            <br />
            <p>E-mail: cdeis@saludcapital.gov.co </p>
            <p>Teléfono: (601) 3649090 extensión 9005</p>
            <p>Versión: 1.0.5 / Última actualización: 02/11/2022</p>
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <div className="footer-container">
            <p>
              <b>Observatorio de Salud</b>
            </p>
            <br />
            <p>Carrera 32 No. 12-81</p>
            <p>Conmutador (601) 3649090 ext.9792</p>
            <p>E-mail: observatoriodesalud@saludcapital.gov.co</p>
            <p>Horario de atención:</p>
            <p>lunes a viernes 8:00 a.m. a 5:00 p.m.</p>
            <p>Bogotá-Colombia</p>
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <div className="footer-container">
            <p>
              <b>Alcaldía Mayor de Bogotá</b>
            </p>
            <br />
            <p>Carrera 8 No. 10-55</p>
            <p>Teléfono: (601) 381 3000</p>
            <p>Horario de atención al público:</p>
            <p>lunes a viernes 9:30 a.m. a 7:00 p.m.</p>
            <p>Bogotá-Colombia</p>
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <div className="footer-container">
            <p>
              <b>Aliados estratégicos</b>
            </p>
            <br />
            <p>
              <a
                href="http://www.saludcapital.gov.co/"
                target="_blank"
                rel="noreferrer"
                className="white--link"
              >
                Secretaría de Salud
              </a>
            </p>
            <p>
              <a
                href="https://www.ins.gov.co/"
                target="_blank"
                rel="noreferrer"
                className="white--link"
              >
                Instituto Nacional de Salud
              </a>
            </p>
            <p>
              <a
                href="https://www.ins.gov.co/Direcciones/ONS/Paginas/default.aspx"
                target="_blank"
                rel="noreferrer"
                className="white--link"
              >
                Observatorio Nacional de Salud
              </a>
            </p>
            <p>
              <a
                href="https://www.paho.org/hq/?lang=es"
                target="_blank"
                rel="noreferrer"
                className="white--link"
              >
                Organización Panamericana de la Salud
              </a>
            </p>
            <p>
              <a
                href="http://www.who.int/es"
                target="_blank"
                rel="noreferrer"
                className="white--link"
              >
                Organización Mundial de la Salud
              </a>
            </p>
          </div>
        </Col>
      </Row>
      <Row align="middle">
        <Divider style={{ margin: 0 }}>
          <img
            src={logo_sds_w}
            alt="Logotipo Secretaría de Salud de Bogotá"
            className="header__logo"
            style={{ width: '220px' }}
          />
        </Divider>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
