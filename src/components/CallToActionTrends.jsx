import React from 'react';

/* UI Library Components */
import { Button } from 'antd';

/* Utilities */
import { Link } from 'react-router-dom';

const CallToActionTrends = ({ core, id, type }) => {
  const title = {
    covid: 'COVID-19',
    pdd: 'el Plan Distrital de Desarrollo',
    pts: 'el Plan Territorial de Salud',
  };
  return type === 'covid' ? (
    <>
      <div
        style={{
          fontSize: '20px',
          marginTop: '20px',
        }}
      >
        <p>
          <b>{`¿Quieres ver la información detallada sobre ${title[type]}?`}</b>
        </p>
      </div>
      <div>
        <Link
          to={`/app/subjects?id=${id}`}
          onClick={() => core.setURL(`/app/subjects?id=${id}`)}
        >
          <Button className="trends-button" size="large" type="primary">
            Haz click aquí
          </Button>
        </Link>
      </div>
    </>
  ) : (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '7px',
        }}
      >
        <p>
          <b>{`Para consultar el documento sobre ${title[type]}`}</b>
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to={`/app/regulations`}
          onClick={() => core.setURL(`/app/regulations`)}
        >
          <Button className="trends-button" type="primary" size="large">
            Haz click aquí
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CallToActionTrends;
