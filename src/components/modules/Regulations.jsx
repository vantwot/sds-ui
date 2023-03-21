import React, { useEffect } from 'react';

/* Components */
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';

/* UI Library Components */
import { Col, Divider, Row, Table, Typography } from 'antd';

/* Utilities */
import { APIRequest } from '../../apis/api';

/* Icons */
import { FilePdfOutlined } from '@ant-design/icons';

/* UI Library Sub-components */
const { Column } = Table;
const { Title } = Typography;

const Regulations = ({ core }) => {
  const [state] = APIRequest(`${core.URL}?data=info`);

  useEffect(() => {
    document.title = 'SALUDATA | Normatividad';
  }, []);

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Row justify="center" style={{ marginTop: '50px', marginBottom: '30px' }}>
      <Col xxl={18} md={22} xs={24}>
        <Title level={2}>
          Normatividad del sistema de investigación en salud.
        </Title>
        <Divider />
        <Title level={4}>
          Aquí podrá consultar y descargar los documentos correspondientes a
          resoluciones, planes, políticas o directrices locales, nacionales e
          internacionales que definen marcos de acción para los sistemas de
          salud y las agendas de investigación locales, nacionales e
          internacionales.
        </Title>
        <Table
          style={{ marginTop: '30px' }}
          dataSource={state.data.data}
          pagination={false}
          rowKey={(record) => state.data.data.indexOf(record)}
        >
          <Column
            align="center"
            responsive={['sm']}
            render={() => <FilePdfOutlined />}
          />
          <Column
            title="Documento"
            dataIndex="filename"
            render={(item) => (
              <a
                id="regulations__table--link"
                href={`/sds_api/app/regulations?file=${item}`}
              >
                {item}
              </a>
            )}
          />
          <Column title="Fecha" dataIndex="date" width={130} />
          <Column
            title="Tamaño"
            dataIndex="size"
            width={130}
            render={(item) =>
              item < 1024
                ? `${item.toFixed(2)} KB`
                : `${(item / 1024).toFixed(2)} MB`
            }
          />
        </Table>
      </Col>
    </Row>
  );
};

export default Regulations;
