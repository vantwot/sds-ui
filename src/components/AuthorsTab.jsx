import React, { useState, useEffect } from 'react';

/* Components */
import ErrorWarning from './ErrorWarning';
import LoadingCard from './LoadingCard';
import SortPolicies from './SortPolicies';
import SubjectsHorizontalList from './SubjectsHorizontalList';

/* UI Components Library */
import { Card, List, Space, Avatar } from 'antd';

/* Icons */
import { CitationsIcon } from '../media/icons/citations';
import {
  CalendarOutlined,
  BankOutlined,
  TeamOutlined,
} from '@ant-design/icons';

/* Utilities */
import { APIRequest } from '../apis/api';
import { Link } from 'react-router-dom';

const AuthorsTab = ({ core }) => {
  const [pagination, setPagination] = useState({ max: 10, page: 1 });
  const [sort, setSort] = useState('citations');
  const [state, setUrl] = APIRequest(
    `${core.URL}&data=authors&max=${pagination.max}&page=${pagination.page}&sort=${sort}`
  );

  const onPageChange = ({ page, pageSize }) => {
    setPagination({ page: page, max: pageSize });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setUrl(
      `${core.URL}&data=authors&max=${pagination.max}&page=${pagination.page}&sort=${sort}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sort]);

  if (state.isError) {
    return <ErrorWarning />;
  }
  if (state.isLoading) {
    return <LoadingCard />;
  }
  return (
    <Card
      headStyle={{ backgroundColor: '#003e65', color: 'white' }}
      size="small"
      title="Autores"
      extra={
        <div>
          <p className="white-text">
            {state.data.total || state.data.total_results}{' '}
            {state.data.total > 1 || state.data.total_results > 1
              ? 'resultados'
              : 'resultado'}
          </p>
          <SortPolicies sort={sort} setSort={setSort} />
        </div>
      }
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={state.data.data}
        pagination={{
          size: 'small',
          position: 'bottom',
          total: state.data.total,
          onChange: (page, pageSize) =>
            onPageChange({
              page,
              pageSize,
            }),
          hideOnSinglePage: true,
          current: pagination.page,
          pageSize: pagination.max,
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Space style={{ fontSize: 18 }}>
                {React.createElement(CalendarOutlined)}
                Publicaciones: {item.products_count}
              </Space>,
              <Space style={{ fontSize: 18 }}>
                {React.createElement(CitationsIcon)}
                Citado: {item.citations_count}
              </Space>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar className="avatar" size="large">
                  {item.name.charAt(0)}
                </Avatar>
              }
              title={
                <Link
                  style={{ fontSize: 18, textDecoration: 'underline' }}
                  to={`/app/authors?id=${item.id}`}
                  onClick={() => core.setURL(`/app/authors?id=${item.id}`)}
                >
                  {item.name}
                </Link>
              }
              description={
                <>
                  {item.affiliation.group.name ? (
                    <div>
                      <TeamOutlined />{' '}
                      <Link
                        style={{
                          fontSize: 12,
                          textDecoration: 'underline',
                        }}
                        to={`/app/groups?id=${item.affiliation.group.id}`}
                        onClick={() =>
                          core.setURL(
                            `/app/groups?id=${item.affiliation.group.id}`
                          )
                        }
                      >
                        {item.affiliation.group.name}
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                  {item.affiliation.institution.name ? (
                    <div>
                      <BankOutlined />{' '}
                      <Link
                        style={{
                          fontSize: 12,
                          textDecoration: 'underline',
                        }}
                        to={`/app/institutions?id=${item.affiliation.institution.id}`}
                        onClick={() =>
                          core.setURL(
                            `/app/institutions?id=${item.affiliation.institution.id}`
                          )
                        }
                      >
                        {item.affiliation.institution.name}
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                  {item.subjects?.length ? (
                    <>
                      <p className="subjects__list--title">Temas: </p>
                      {SubjectsHorizontalList({
                        subjectsList: item.subjects,
                        core: core,
                      })}
                    </>
                  ) : (
                    ''
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AuthorsTab;
