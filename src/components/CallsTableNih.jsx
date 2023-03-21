import React, { useEffect, useState } from 'react';

/* UI Library Components */
import { Table } from 'antd';

/* Utilities */
import { APIRequest } from '../apis/api';
import { useLocation } from 'react-router';

/* UI Library Sub-components */
const { Column } = Table;

const CallsTableNih = () => {
  const windowWidth = window.screen.width;
  const location = useLocation();
  const [pagination, setPagination] = useState({ page: 1, max: 10 });
  let URL = location.pathname;
  const [state, setUrl] = APIRequest(
    `${URL}?data=nih&page=${pagination.page}&max=${pagination.max}`
  );

  useEffect(() => {
    setUrl(`${URL}?data=nih&page=${pagination.page}&max=${pagination.max}`);
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
          width={windowWidth < 800 ? '50%' : '65%'}
          render={(item, datum) => (
            <a href={datum.url} target="_blank" rel="noreferrer">
              {item}
            </a>
          )}
        />
        <Column
          title="Organización"
          dataIndex="organization"
          key="organization"
        />
        <Column
          title="Fecha de apertura"
          dataIndex="release_date"
          key="release_date"
        />
        <Column
          title="Fecha de cierre"
          dataIndex="expiration_date"
          key="expiration_date"
        />
      </Table>
    </div>
  );
};

export default CallsTableNih;
