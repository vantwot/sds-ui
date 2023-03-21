import React from 'react';

/* Icons */
import { WarningOutlined } from '@ant-design/icons';

/* UI Library */
import { Button, Col, Row, Typography } from 'antd';

/* Utilities */
import { Link } from 'react-router-dom';

const NotFound = ({ core }) => {
  return (
    <Row justify="center" className="align__center">
      <Col span={24}>
        <WarningOutlined id="notfound__icon" />
      </Col>
      <Col span={24}>
        <Typography.Title id="notfound__title" className="title--margin0">
          404
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={4} className="title--margin0">
          Lo sentimos, la página que intentas visitar no se encuentra en nuestro
          servidor.
        </Typography.Title>
      </Col>
      <Col span={24} style={{ marginTop: '30px' }}>
        <Link to="/app">
          <Button type="primary">Llévame al inicio</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default NotFound;
