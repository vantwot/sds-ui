import React from 'react';

/* Components */
import PoliciesTag from './PoliciesTag';

/* Utilities */
import { Link } from 'react-router-dom';

/* Components */
import { externalUrls } from './externalUrls';

/* UI Library Components*/
import { Col, Card, Avatar, Row, Typography } from 'antd';

/* Icons */
import { ReadOutlined, BankOutlined } from '@ant-design/icons';

/* UI Library Sub-components */
const { Meta } = Card;
const { Title } = Typography;

const CommonTitleCard = ({ core, data, type }) => {
  const logoPath =
    type === 'institutions' ? data.logo : data.affiliation?.institution?.logo;

  return (
    <Col span={24}>
      <Card actions={externalUrls(data.external_urls)} className="pattern">
        <Meta
          avatar={
            <Avatar
              size={{ xs: 60, sm: 60, md: 150, lg: 150, xl: 150, xxl: 150 }}
              src={
                logoPath || (
                  <ReadOutlined style={{ color: 'gray', fontSize: '40px' }} />
                )
              }
              style={{
                backgroundColor: 'white',
                padding: 10,
                border: '1px solid lightgray',
              }}
            />
          }
          description={
            <>
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {data.name}{' '}
                {data.abbreviations ? `(${data.abbreviations})` : ''}
              </Typography.Title>
              <Typography.Title
                className="bold"
                level={3}
                style={{ marginTop: 0, color: 'gray', marginBottom: 0 }}
              >
                {data.citations ? `Citaciones: ${data.citations}` : ''}
              </Typography.Title>
              <Typography.Paragraph
                style={{ fontSize: 16, margin: 0 }}
                underline
              >
                {type !== 'institutions' &&
                  data.affiliation?.institution?.name && (
                    <>
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
                    </>
                  )}
              </Typography.Paragraph>
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

export default CommonTitleCard;
