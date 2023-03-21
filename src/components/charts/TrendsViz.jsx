import React, { useEffect } from 'react';

/* Charts */
import WordCloudChart from '../charts/WordCloudChart';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { Card, Col, Row, Statistic, Tooltip } from 'antd';

/* Components */
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import EmptyCard from '../EmptyCard';

/* Icons */
import {
  BankOutlined,
  TeamOutlined,
  UserOutlined,
  FileOutlined,
} from '@ant-design/icons';

const TrendsViz = ({ selection, type, core }) => {
  const [state, setState] = APIRequest(
    `/app/trends?data=${type}&${type}=${selection}`
  );

  useEffect(() => {
    setState(`/app/trends?data=${type}&${type}=${selection}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Row gutter={[10, 10]}>
      <Col xs={12} lg={6}>
        <Tooltip
          color="blue"
          title="Si desea consultar las instituciones correspondientes a esta categoría, usar el buscador por producto con el concepto correspondiente entre comillas."
        >
          <Card size="small">
            <Statistic
              title="Instituciones"
              value={state.data.institutions}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Tooltip>
      </Col>
      <Col xs={12} lg={6}>
        <Tooltip
          color="blue"
          title="Si desea consultar los grupos correspondientes a esta categoría, usar el buscador por producto con el concepto correspondiente entre comillas."
        >
          <Card size="small">
            <Statistic
              title="Grupos"
              value={state.data.groups}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Tooltip>
      </Col>
      <Col xs={12} lg={6}>
        <Tooltip
          color="blue"
          title="Si desea consultar los autores correspondientes a esta categoría, usar el buscador por producto con el concepto correspondiente entre comillas."
        >
          <Card size="small">
            <Statistic
              title="Autores"
              value={state.data.authors}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Tooltip>
      </Col>
      <Col xs={12} lg={6}>
        <Tooltip
          color="blue"
          title="Si desea consultar los productos correspondientes a esta categoría, usar el buscador por producto con el concepto correspondiente entre comillas."
        >
          <Card size="small">
            <Statistic
              title="Productos"
              value={state.data.products}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={<FileOutlined />}
            />
          </Card>
        </Tooltip>
      </Col>
      <Col span={24}>
        {state?.data?.word_cloud?.length === 0 ? (
          <EmptyCard />
        ) : (
          <WordCloudChart
            title="Temas"
            data={state.data.word_cloud}
            core={core}
          />
        )}
      </Col>
    </Row>
  );
};

export default TrendsViz;
