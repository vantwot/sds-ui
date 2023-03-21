import React, { useEffect } from "react";

/* UI Library Components */
import { Table } from "antd";

/* Utilities */
import { APIRequest } from "../apis/api";
import { useLocation } from "react-router";

/* UI Library Sub-components */
const { Column } = Table;

const CallsTableMin = () => {
  const windowWidth = window.screen.width;
  const location = useLocation();
  let URL = location.pathname;
  const [state, setUrl] = APIRequest(`${URL}?data=min`);

  useEffect(() => {
    setUrl(`${URL}?data=min`);
  }, [setUrl, URL]);

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
        sticky
        scroll={{ y: 400, x: 800 }}
        pagination={{
          total: state.data.total,
          defaultPageSize: 5,
          size: "small",
          hideOnSinglePage: true,
        }}
      >
        <Column
          title="Nombre"
          dataIndex="title"
          key="title"
          width={windowWidth < 800 ? "50%" : "65%"}
          render={(item, datum) => (
            <a href={datum.url} target="_blank" rel="noreferrer">
              {item}
            </a>
          )}
        />
        <Column title="Fecha de apertura" dataIndex="release_date" key="date" />
        <Column title="Recursos" dataIndex="amount" key="amount" />
      </Table>
    </div>
  );
};

export default CallsTableMin;
