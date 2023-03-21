import React from 'react';

/* Components */
import AuthorsHorizontalList from './AuthorsHorizontalList';
import DocumentModal from './DocumentModal';
import OpenAccessStatus from './OpenAccessStatus';
import SortProduction from './SortProduction';
import SubjectsHorizontalList from './SubjectsHorizontalList';

/* UI Library Components */
import { Card, List, Modal, Space, Typography } from 'antd';

/* Icons */
import { CitationsIcon } from '../media/icons/citations';
import { CalendarOutlined, ReadOutlined } from '@ant-design/icons';

/* UI Library Sub-components */
const { Link } = Typography;

const DocumentList = ({ data, tools, title = 'Artículos', core }) => {
  const onPageChange = ({ page, pageSize }) => {
    tools.setPagination({ page: page, max: pageSize });
    window.scrollTo(0, 745);
  };

  const docInfo = (title, id, status) => {
    Modal.info({
      width: '1200px',
      title: [
        title,
        ' ',
        status && <OpenAccessStatus status={status} key="0" />,
      ],
      closable: true,
      icon: null,
      okText: 'Cerrar',
      maskClosable: true,
      content: <DocumentModal documentID={id} />,
      onOk() {},
    });
  };

  if (data.data.length && data.data[0].title) {
    return (
      <Card
        headStyle={{ backgroundColor: '#003e65', color: 'white' }}
        size="small"
        extra={
          <div>
            <p className="white-text">
              {data.total || data.total_results}{' '}
              {data.total || data.total_results > 1
                ? 'resultados'
                : 'resultado'}
            </p>
            <SortProduction tools={tools} key="1" />
          </div>
        }
        title={title}
      >
        <div id="productionListContainer">
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              size: 'small',
              position: 'bottom',
              total: data.total || data.total_results,
              onChange: (page, pageSize) =>
                onPageChange({
                  page,
                  pageSize,
                }),
              hideOnSinglePage: true,
              current: tools.pagination.page,
              pageSize: tools.pagination.max,
            }}
            dataSource={data.data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Space style={{ fontSize: 18 }}>
                    {React.createElement(CalendarOutlined)}
                    Publicado: {item.year_published}
                  </Space>,
                  <Space style={{ fontSize: 18 }}>
                    {React.createElement(CitationsIcon)}
                    {item.citations_count === 1
                      ? `${item.citations_count} citación`
                      : `${item.citations_count} citaciones`}
                  </Space>,
                ]}
              >
                <List.Item.Meta
                  title={[
                    <Link
                      key="1"
                      onClick={() =>
                        docInfo(item.title, item.id, item.open_access_status)
                      }
                    >
                      {item.title}
                    </Link>,
                    ' ',
                    item.open_access_status && (
                      <OpenAccessStatus
                        status={item.open_access_status}
                        key="2"
                      />
                    ),
                  ]}
                  description={
                    item.source && (
                      <div>
                        <ReadOutlined /> {item.source.name}
                      </div>
                    )
                  }
                />
                Autores:{' '}
                {AuthorsHorizontalList({
                  authorsList: item.authors,
                  core: core,
                })}
                {item.subjects.length ? (
                  <>
                    Temas:{' '}
                    {SubjectsHorizontalList({
                      subjectsList: item.subjects,
                      core: core,
                    })}
                  </>
                ) : (
                  ''
                )}
              </List.Item>
            )}
          ></List>
        </div>
      </Card>
    );
  } else {
    return (
      <Card title={'Artículos'} size="small">
        <List></List>
      </Card>
    );
  }
};

export default DocumentList;
