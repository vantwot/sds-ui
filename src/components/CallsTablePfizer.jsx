import React from 'react';

/* UI Library Components */
import { Table } from 'antd';

/* Utilities */
import { APIRequest } from '../apis/api';
import { useLocation } from 'react-router';

/* UI Library Sub-components */
const { Column } = Table;

const CallsTablePfizer = () => {
  const location = useLocation();
  let URL = location.pathname;
  const [state] = APIRequest(`${URL}?data=pfizer`);

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
        dataSource={state.data}
        rowKey={(record) => state.data.indexOf(record)}
        sticky
        scroll={{ y: 400, x: 800 }}
      >
        <Column
          title="Nombre"
          dataIndex="title"
          key="title"
          width={'40%'}
          render={(item, datum) => (
            <a href={datum.url} target="_blank" rel="noreferrer">
              {item}
            </a>
          )}
        />
        <Column
          title="Fecha de apertura"
          dataIndex="release_date"
          key="release_date"
        />
        <Column title="Fecha de cierre" dataIndex="due_date" key="due_date" />
        <Column
          title="Proceso de revisión"
          dataIndex="review_process"
          key="review_process"
        />
        <Column
          title="Tipo de Subvención"
          dataIndex="grant_type"
          key="grant_type"
        />
        <Column
          title="Area de Enfoque"
          dataIndex="focus_area"
          key="focus_area"
        />
        <Column title="País" dataIndex="country" key="country" />
      </Table>
    </div>
  );
};

export default CallsTablePfizer;
