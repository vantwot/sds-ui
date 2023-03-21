import React, { useEffect, useState } from 'react';

/* Components */
import ErrorWarning from './ErrorWarning';
import LoadingCard from './LoadingCard';
import SortCompendium from './SortCompendium';
import InfoButton from './infoButton';

/* UI Library Components */
import { Card, List, Row, Table } from 'antd';

/* Utilities */
import { APIRequest } from '../apis/api';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

/* Charts */
import TinyColumnChart from './charts/TinyColumnChart';
import TinyWordCloudChart from './charts/TinyWordCloudChart';

/* UI Library Sub-components */
const { Column } = Table;

const CompendiumTable = ({ core, type }) => {
  const [pagination, setPagination] = useState({ page: 1, max: 5 });
  const [sort, setSort] = useState('citations');
  const location = useLocation();
  let policies_flag = location.pathname === '/app/policies';
  let URL = new URLSearchParams(location.search);
  URL.delete('data');
  URL.set('data', type);

  const [state, setUrl] = APIRequest(
    `${location.pathname}?${URL.toString()}&page=${pagination.page}&max=${
      pagination.max
    }&sort=${sort}`
  );

  const title = {
    groups: 'Grupo de investigación',
    institutions: 'Institución',
    subjects: 'Tema',
  };

  const onPageChange = ({ page, max }) => {
    setPagination({ page: page, max: max });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setUrl(
      `${location.pathname}?${URL.toString()}&page=${pagination.page}&max=${
        pagination.max
      }&sort=${sort}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sort, core.URL]);

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  if (type === 'subjects') {
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
            onChange: (page, max) => onPageChange({ page: page, max: max }),
          }}
          rowClassName="compendium__row--height"
          scroll={{ x: 1300 }}
        >
          {!policies_flag && (
            <Column
              align="center"
              title="Puesto"
              dataIndex="index"
              render={(index) => <b>{index}</b>}
            />
          )}
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
          <Column title="Productos totales" dataIndex={'products_count'} />
          <Column title="Citas totales" dataIndex={'citations_count'} />
          <Column
            width={'18%'}
            title="Instituciones"
            dataIndex={'institutions'}
            render={(institutionsList) => (
              <List
                size="small"
                dataSource={institutionsList}
                renderItem={(item) => (
                  <List.Item
                    style={{ paddingTop: '3px', paddingBottom: '3px' }}
                  >
                    <Link
                      to={`/app/institutions?id=${item.id}`}
                      onClick={() =>
                        core.setURL(`/app/institutions?id=${item.id}`)
                      }
                    >
                      {item.name}
                    </Link>
                  </List.Item>
                )}
              />
            )}
          />
          <Column
            width={'18%'}
            title="Grupos"
            dataIndex={'groups'}
            render={(groupsList) => (
              <List
                size="small"
                dataSource={groupsList}
                renderItem={(item) => (
                  <List.Item>
                    <Link
                      to={`/app/groups?id=${item.id}`}
                      onClick={() => core.setURL(`/app/groups?id=${item.id}`)}
                    >
                      {item.name}
                    </Link>
                  </List.Item>
                )}
              />
            )}
          />
          <Column
            width={'18%'}
            title="Autores"
            dataIndex={'authors'}
            render={(authorsList) => (
              <List
                size="small"
                dataSource={authorsList}
                renderItem={(item) => (
                  <List.Item>
                    <Link
                      to={`/app/authors?id=${item.id}`}
                      onClick={() => core.setURL(`/app/authors?id=${item.id}`)}
                    >
                      {item.name}
                    </Link>
                  </List.Item>
                )}
              />
            )}
          />
          <Column
            title={() => {
              return (
                <Row justify="space-between" align="middle">
                  Productos por años
                  <div id="table__infoButton">
                    <InfoButton title="Productos por año" type={'columnLine'} />
                  </div>
                </Row>
              );
            }}
            dataIndex={'plot'}
            render={(item) => <TinyColumnChart data={item} />}
            width={'30%'}
          />
        </Table>
      </Card>
    );
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
          onChange: (page, max) => onPageChange({ page: page, max: max }),
        }}
        rowClassName="compendium__row--height"
        scroll={{ x: 1300 }}
      >
        {!policies_flag && (
          <Column
            align="center"
            title="Puesto"
            dataIndex="index"
            render={(index) => <b>{index}</b>}
          />
        )}
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
        {type !== 'institutions' ? (
          <Column
            title="Afiliación"
            dataIndex={'affiliations'}
            render={(item) => (
              <Link
                to={`/app/institutions?id=${item.institution?.id}`}
                onClick={() =>
                  core.setURL(`/app/institutions?id=${item.institution.id}`)
                }
              >
                {item.institution.name}
              </Link>
            )}
          />
        ) : (
          ''
        )}
        <Column title="Productos totales" dataIndex={'products_count'} />
        <Column title="Citas totales" dataIndex={'citations_count'} />
        <Column
          title={() => {
            return (
              <Row justify="space-between" align="middle">
                Productos por años
                <div id="table__infoButton">
                  <InfoButton title="Productos por año" type={'columnLine'} />
                </div>
              </Row>
            );
          }}
          dataIndex={'plot'}
          render={(item) => <TinyColumnChart Chart data={item} />}
          width={'30%'}
        />
        <Column
          title="Temas"
          dataIndex={'subjects'}
          width={'30%'}
          render={(item) => <TinyWordCloudChart data={item} core={core} />}
        />
      </Table>
    </Card>
  );
};

export default CompendiumTable;
