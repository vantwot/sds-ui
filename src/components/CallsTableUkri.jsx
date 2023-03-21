import React, { useState, useEffect } from 'react';

/* UI Library Components */
import { Table } from 'antd';

/* Utilities */
import { APIRequest } from '../apis/api';
import { useLocation } from 'react-router';

/* UI Library Sub-components */
const { Column } = Table;

const CallsTableUkri = () => {
  const location = useLocation();
  const [pagination, setPagination] = useState({ page: 1, max: 10 });
  let URL = location.pathname;
  const [state, setUrl] = APIRequest(
    `${URL}?data=ukri&page=${pagination.page}&max=${pagination.max}`
  );

  useEffect(() => {
    setUrl(`${URL}?data=ukri&page=${pagination.page}&max=${pagination.max}`);
  }, [setUrl, URL, pagination]);

  const onPageChange = (paginate) => {
    setPagination({ page: paginate.current, max: paginate.pageSize });
  };

  if (state.isLoading) {
    return (
      <div>
        <Table loading />
      </div>
    );
  }
  return (
    <div>
      <Table
        dataSource={state.data.data}
        rowKey={(record) => state.data.data.indexOf(record)}
        onChange={(paginate) => onPageChange(paginate)}
        sticky
        scroll={{ y: 400, x: 800 }}
        pagination={{
          total: state.data.total,
          current: pagination.page,
          pageSize: pagination.pageSize,
          size: 'small',
          hideOnSinglePage: true,
        }}
      >
        <Column
          title="Nombre"
          dataIndex="title"
          key="title"
          width={'15%'}
          render={(item, datum) => (
            <a href={datum.url} target="_blank" rel="noreferrer">
              {item}
            </a>
          )}
        />
        <Column
          title="Descripción"
          width={'30%'}
          dataIndex="description"
          key="description"
        />
        <Column
          title="Fecha de publicación"
          dataIndex="publication_date"
          key="publication_date"
        />
        <Column title="Tipo" dataIndex="type" key="type" />
        <Column
          title="Fecha de apertura"
          dataIndex="opening_date"
          key="opening_date"
        />
        <Column
          title="Fecha de cierre"
          dataIndex="closing_date"
          key="closing_date"
        />
        <Column
          title="Fondos totales"
          dataIndex="total_fund"
          key="total_fund"
        />
        <Column
          title="Finaciadores"
          dataIndex="funders"
          key="funders"
          render={(item, datum) => (
            <a href={datum.funders_url} target="_blank" rel="noreferrer">
              {item}
            </a>
          )}
        />
        <Column
          title="Estado"
          dataIndex="status"
          key="status"
          render={(item) => (item === 'Open' ? 'Abierta' : item)}
        />
      </Table>
    </div>
  );
};

export default CallsTableUkri;
