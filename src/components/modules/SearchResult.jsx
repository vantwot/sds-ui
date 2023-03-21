import React, { useState, useEffect } from 'react';

//import { useHistory } from "react-router";

/* Components */
import ErrorWarning from '../ErrorWarning';
import LoadingCard from '../LoadingCard';
import ProductionResult from '../ProductionResult';
import SortSearchResults from '../SortSearchResults';

/* UI Library Components */
import { Avatar, Card, Col, List, Row, Space } from 'antd';

/* Icons */
import {
  BankOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { CitationsIcon } from '../../media/icons/citations';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { titles } from '../../utils/texts';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
const queryString = require('query-string');

const SearchResult = ({ core }) => {
  const location = useLocation();
  const parsed = queryString.parse(core.URL);
  const type = parsed['/app/search?data'];
  const [pagination, setPagination] = useState({ max: 10, page: 1 });
  const [sort, setSort] = useState('citations');
  const [state, setUrl] = APIRequest(
    `${location.pathname}${location.search}&max=${pagination.max}&page=${pagination.page}&sort=${sort}`
  );
  const tools = { sort, setSort };

  useEffect(() => {
    document.title = 'Resultados de Búsqueda | SALUDATA';
  }, []);

  useEffect(() => {
    setPagination({ max: 10, page: 1 });
    setSort('citations');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [core.URL]);

  useEffect(() => {
    core.setFilters(state.data.filters);
    return () => {
      core.setFilters(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    setPagination({ max: 10, page: 1 });
  }, [sort]);

  useEffect(() => {
    setUrl(
      `${location.pathname}${location.search}&max=${pagination.max}&page=${pagination.page}&sort=${sort}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const onPageChange = ({ page, pageSize }) => {
    setPagination({ page: page, max: pageSize });
    window.scrollTo(0, 0);
  };

  if (state.isError) {
    return <ErrorWarning />;
  } else if (state.isLoading) {
    return <LoadingCard />;
  }
  return type === 'literature' ? (
    <ProductionResult data={state.data} core={core} />
  ) : (
    <Row align="center">
      <Col span={24}>
        <Card
          headStyle={{ backgroundColor: '#003e65', color: 'white' }}
          size="small"
          bodyStyle={{ padding: '10px' }}
          title={titles[parsed['/app/search?data']]}
          extra={
            <div>
              <p className="white-text">
                {state.data.total_results}{' '}
                {state.data.total_results === 1 ? 'resultado' : 'resultados'}
              </p>
              <SortSearchResults tools={tools} key="1" />
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
              total: state.data.total_results,
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
                    Publicaciones: {item.papers_count || item.products_count}
                  </Space>,
                  <Space style={{ fontSize: 18 }}>
                    {React.createElement(CitationsIcon)}
                    Citado: {item.citations_count}
                  </Space>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    type === 'institutions' ? (
                      item.logo ? (
                        <Avatar size={48} src={item.logo} />
                      ) : (
                        <Avatar className="avatar" size={48} src={item.logo}>
                          U
                        </Avatar>
                      )
                    ) : (
                      <Avatar
                        className="avatar"
                        size={{
                          xs: 40,
                          sm: 50,
                          md: 60,
                          lg: 60,
                          xl: 60,
                          xxl: 60,
                        }}
                      >
                        {item.name.charAt(0)}
                      </Avatar>
                    )
                  }
                  title={
                    <Link
                      className="searchResult--link"
                      to={`/app/${parsed['/app/search?data']}?id=${item.id}`}
                      onClick={() =>
                        core.setURL(
                          `/app/${parsed['/app/search?data']}?id=${item.id}`
                        )
                      }
                    >
                      {item.name}
                    </Link>
                  }
                  description={
                    type !== 'institutions' ? (
                      <>
                        {type === 'authors' && item.affiliation?.group?.name ? (
                          <div>
                            <TeamOutlined />{' '}
                            <Link
                              className="affiliation--link"
                              to={`/app/groups?id=${item.affiliation?.group?.id}`}
                              onClick={() =>
                                core.setURL(
                                  `/app/groups?id=${item.affiliation?.group?.id}`
                                )
                              }
                            >
                              {item.affiliation?.group?.name}
                            </Link>
                          </div>
                        ) : (
                          ''
                        )}
                        {item.affiliation?.institution?.name && (
                          <div>
                            <BankOutlined />{' '}
                            <Link
                              className="affiliation--link"
                              to={`/app/institutions?id=${item.affiliation?.institution?.id}`}
                              onClick={() =>
                                core.setURL(
                                  `/app/institutions?id=${item.affiliation?.institution?.id}`
                                )
                              }
                            >
                              {item.affiliation?.institution?.name}
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      ''
                    )
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default SearchResult;
