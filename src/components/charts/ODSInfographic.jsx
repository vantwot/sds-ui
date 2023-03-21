import React from 'react';

/* UI Library Components */
import { Button, Card, Col } from 'antd';
import { Link } from 'react-router-dom';

const ODSInfographic = ({ core, data }) => {
  const colorList = [
    '#F0B60D',
    '#009E41',
    '#E84639',
    '#00A7D1',
    '#EA6636',
    '#004E88',
    '#467735',
    '#D5A200',
    '#309637',
    '#931533',
    '#1E3464',
    '#DD0076',
    '#0678B8',
  ];
  return data.map((item, index) => {
    return (
      <Col key={item.index} xs={24} md={12} xl={8} xxl={6} className="ods__box">
        <Card
          bordered
          hoverable
          title={item.index}
          style={{ height: '350px' }}
          bodyStyle={{ padding: '10px' }}
          headStyle={{
            backgroundColor: colorList[index],
            color: 'white',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          <p className="ods__name">"{item.name}."</p>
          <Card.Meta
            description={
              <div className="ods-card">
                <p>Documentos: {item.products}</p>
                <p>Autores: {item.authors}</p>
                <p>Grupos: {item.groups}</p>
                <p>Instituciones: {item.institutions}</p>
              </div>
            }
          />
          <div className="ods__button--container">
            <Link
              to={`/app/policies?id=${item.id}`}
              onClick={() => core.setURL(`/app/policies?id=${item.id}`)}
            >
              <Button className="trends-button" type="primary">
                Ampliar información
              </Button>
            </Link>
          </div>
        </Card>
      </Col>
    );
  });
};

export default ODSInfographic;
