import React from "react";

/* Components */
import PoliciesTag from "./PoliciesTag";

/* UI Library */
import { Col, Card, Typography } from "antd";

/* UI Library Sub-components */
const { Meta } = Card;
const { Title } = Typography;

const PoliciesTitleCard = ({ core, data }) => {
  return (
    <Col span={24}>
      <Card className="pattern">
        <Meta
          description={
            <>
              <PoliciesTag
                type={data.abbreviations}
                data={data.index}
                core={core}
              />
              <Title level={2} className="title--margin0">
                {data.name}{" "}
              </Title>
              <p>
                <b>{data.description && `"${data.description}"`}</b>
              </p>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default PoliciesTitleCard;
