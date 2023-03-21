import React from 'react';

/* Utilities */
import { Link } from 'react-router-dom';

/* UI Library */
import { Avatar, Row, Tag, Tooltip } from 'antd';

/* Icons */
import { CheckCircleOutlined } from '@ant-design/icons';

/* Media */
import ODS_logo from '../media/ODS_logo.svg';
import PTS_logo from '../media/PTS_logo.svg';
import PDD_logo from '../media/PDD_logo.svg';

const PoliciesTag = ({ type, data, core }) => {
  const logo = { ODS: ODS_logo, PTS: PTS_logo, PDD: PDD_logo };
  const policies = core.URL.slice(0, 13) === '/app/policies';

  if (policies) {
    return (
      <Tag className="policies__tag">
        <img src={logo[type]} alt={`Logotipo de ${type}`} id="tag__logo" />
        {type === 'ODS' ? (
          typeof data === 'string' ? (
            <Avatar id="tag__avatar">{data}</Avatar>
          ) : (
            data.map((item) => <Avatar id="tag__avatar">{item.index}</Avatar>)
          )
        ) : (
          <Avatar id="tag__avatar" icon={<CheckCircleOutlined />} />
        )}
      </Tag>
    );
  }
  return type === 'ODS' ? (
    <Tag className="policies__tag" style={{ marginBottom: '10px' }}>
      <Row align="middle" gutter={[5, 5]}>
        <img src={logo[type]} alt={`Logotipo de ${type}`} id="tag__logo" />
        {typeof data === 'number' ? (
          <Avatar id="tag__avatar">{data}</Avatar>
        ) : (
          data.map((item) => (
            <Tooltip key={item.id} title={item.name} color="cyan">
              <Link
                to={`/app/policies?id=${item.id}`}
                onClick={() => core.setURL(`/app/policies?id=${item.id}`)}
              >
                <Avatar id="tag__avatar">{item.index}</Avatar>
              </Link>
            </Tooltip>
          ))
        )}
      </Row>
    </Tag>
  ) : (
    <Link
      key={data[0].id}
      to={`/app/policies?id=${data[0].id}`}
      onClick={() => core.setURL(`/app/policies?id=${data[0].id}`)}
    >
      <Tag className="policies__tag">
        <img src={logo[type]} alt={`Logotipo de ${type}`} id="tag__logo" />
        <Avatar id="tag__avatar" icon={<CheckCircleOutlined />} />
      </Tag>
    </Link>
  );
};

export default PoliciesTag;
