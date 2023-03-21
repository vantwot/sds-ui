import React, { useState, useEffect } from 'react';

/* Components */
import ErrorWarning from './ErrorWarning';
import LoadingCard from './LoadingCard';
import SortCompendium from './SortCompendium';

/* UI Library Components */
import { Card, Table } from 'antd';

/* Utilities */
import { APIRequest } from '../apis/api';
import { Link } from 'react-router-dom';

/* Charts */
import TinyColumnChart from './charts/TinyColumnChart';
import TinyWordCloudChart from './charts/TinyWordCloudChart';

/* UI Library Sub-components */
const { Column } = Table;

const SubjectsTable = ({ core, type }) => {
  const [pagination, setPagination] = useState({ max: 5, page: 1 });
  const [sort, setSort] = useState('citations');
  const [state, setUrl] = APIRequest(
    `${core.URL}&data=${type}&max=${pagination.max}&page=${pagination.page}&sort=${sort}`
  );

  const title = { institutions: 'Institución', groups: 'Grupo' };

  useEffect(() => {
    setUrl(
      `${core.URL}&data=${type}&max=${pagination.max}&page=${pagination.page}&sort=${sort}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sort, core.URL]);

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Card
      size="small"
      bordered={false}
      style={{ backgroundColor: '#fafafa' }}
      bodyStyle={{ padding: 0 }}
      extra={<SortCompendium sort={sort} setSort={setSort} />}
    >
      <Table
        size="small"
        dataSource={state.data.data}
        bordered
        rowKey={(record) => record.id}
        pagination={{
          total: state.data.total,
          showSizeChanger: true,
          current: pagination.page,
          pageSize: pagination.max,
          pageSizeOptions: [5, 10, 15],
          onChange: (page, max) => setPagination({ page: page, max: max }),
        }}
        rowClassName="compendium__row--height"
        scroll={{ x: 1400 }}
      >
        <Column
          title={title[type]}
          render={(item) => (
            <Link
              to={`/app/${type}?id=${item.id}`}
              onClick={() => core.setURL(`/app/${type}?id=${item.id}`)}
            >
              {item.name}
            </Link>
          )}
        />
        {type === 'groups' && (
          <Column
            title="Afiliación"
            dataIndex={'institution'}
            render={(item) => (
              <Link
                to={`/app/institutions?id=${item.id}`}
                onClick={() => core.setURL(`/app/institutions?id=${item.id}`)}
              >
                {item.name}
              </Link>
            )}
          />
        )}
        <Column
          title="Citas totales"
          dataIndex={'citations_count'}
          align="center"
        />
        <Column
          title="Productos totales"
          dataIndex={'products_count'}
          align="center"
          style={{ fontSize: '24px' }}
        />
        <Column
          title="Productos por año"
          dataIndex={'plot'}
          render={(item) => <TinyColumnChart data={item} />}
          width={'30%'}
        />
        <Column
          title="Temas"
          dataIndex={'word_cloud'}
          width={'30%'}
          render={(item) => <TinyWordCloudChart data={item} core={core} />}
        />
      </Table>
    </Card>
  );
};

export default SubjectsTable;
