import React from 'react';

/* Components */
import PoliciesTag from './PoliciesTag';

/* Utilities */
import { Link } from 'react-router-dom';

/* UI Library Components */
import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd';

/* Icons */
import orcid from '../media/icons/orcid';
import researcherid from '../media/icons/researcherid';
import scholar from '../media/icons/scholar';
import scopus from '../media/icons/scopus';
import linkedin from '../media/icons/linkedin';
import cvlac from '../media/icons/cvlac';
import { BankOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';

/* UI Library Sub-components */
const { Meta } = Card;
const { Title } = Typography;

const AuthorsTitleCard = ({ core, data }) => {
  const iconList = {
    orcid: orcid(),
    scholar: scholar(),
    scopus: scopus(),
    researcherid: researcherid(),
    linkedin: linkedin(),
    minciencias: cvlac(),
  };

  const renderedButtons = (URLList) => {
    return URLList.map((item) => (
      <a href={item.url} key={item.source} target="_blank" rel="noreferrer">
        <Button type="link" icon={iconList[item.source]} />
      </a>
    ));
  };

  return (
    <Col span={24}>
      <Card className="pattern">
        <Meta
          avatar={
            <Avatar
              size={{ xs: 60, sm: 60, md: 150, lg: 150, xl: 150, xxl: 150 }}
              src={
                data.logo ? (
                  data.logo
                ) : (
                  <ReadOutlined style={{ color: 'gray', fontSize: '40px' }} />
                )
              }
              style={{
                backgroundColor: 'white',
                padding: 5,
                border: '1px solid lightgray',
              }}
            />
          }
          description={
            <>
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {data.name}{' '}
                {data.country ? (
                  <img
                    style={{ paddingBottom: '3px' }}
                    alt={`flag of ${data.country}`}
                    title={data.country}
                    src={`https://flagcdn.com/28x21/${data.country_code.toLowerCase()}.png`}
                  />
                ) : (
                  ''
                )}
              </Typography.Title>
              <Typography.Title
                className="bold"
                level={3}
                style={{ marginTop: 0, color: 'gray', marginBottom: 0 }}
              >
                {data.citations ? `Citaciones: ${data.citations}` : ''}
              </Typography.Title>
              {data.affiliation?.institution?.name && (
                <Typography.Paragraph
                  style={{ fontSize: 16, margin: 0 }}
                  underline
                >
                  <BankOutlined
                    style={{ marginRight: '10px', color: 'gray' }}
                  />
                  <Link
                    to={`/app/institutions?id=${data.affiliation.institution.id}`}
                    onClick={() =>
                      core.setURL(
                        `/app/institutions?id=${data.affiliation.institution.id}`
                      )
                    }
                  >
                    {data.affiliation.institution.name}
                  </Link>
                </Typography.Paragraph>
              )}
              {data.affiliation?.group?.name && (
                <Typography.Paragraph
                  style={{ fontSize: 16, marginBottom: '5px' }}
                  underline
                >
                  <TeamOutlined
                    style={{ marginRight: '10px', color: 'gray' }}
                  />
                  <Link
                    to={`/app/groups?id=${data.affiliation.group.id}`}
                    onClick={() =>
                      core.setURL(`/app/groups?id=${data.affiliation.group.id}`)
                    }
                  >
                    {data.affiliation.group.name}
                  </Link>
                </Typography.Paragraph>
              )}
              <Title
                className="bold"
                level={4}
                style={{ marginTop: 0, color: 'gray', marginBottom: 0 }}
              >
                Perfil en:
              </Title>
              <Space wrap>{renderedButtons(data.external_urls)}</Space>
              {data.policies.ODS && (
                <Title
                  className="bold"
                  level={4}
                  style={{ marginTop: 0, color: 'gray', marginBottom: 0 }}
                >
                  Aportes en:
                </Title>
              )}
              <Row style={{ marginTop: '10px' }}>
                {data.policies.ODS && (
                  <PoliciesTag
                    type="ODS"
                    data={data.policies.ODS}
                    core={core}
                  />
                )}
                {data.policies.PDD && (
                  <PoliciesTag
                    type="PDD"
                    data={data.policies.PDD}
                    core={core}
                  />
                )}
                {data.policies.PTS && (
                  <PoliciesTag
                    type="PTS"
                    data={data.policies.PTS}
                    core={core}
                  />
                )}
              </Row>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default AuthorsTitleCard;
