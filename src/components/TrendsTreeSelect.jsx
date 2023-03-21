import React, { useState } from 'react';

/* UI Library Components */
import { Col, Empty, Row, TreeSelect } from 'antd';
import Title from 'antd/lib/typography/Title';

/* Components */
import TrendsViz from './charts/TrendsViz';

const TrendsTreeSelect = ({ data, core }) => {
  const [value, setValue] = useState();

  const onChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Row style={{ marginLeft: '20px', marginRight: '20px' }}>
      <Col span={24}>
        <Title level={4}>
          Selecciona un Programa o un Concepto para ver la información detallada
          y los temas asociados a cada uno, puedes hacer click sobre cada tema
          en la nube de palabras para ver su perfil.
        </Title>
      </Col>
      <Col span={24} style={{ marginTop: '10px', marginBottom: '20px' }}>
        <TreeSelect
          style={{
            width: '100%',
          }}
          value={value}
          dropdownStyle={{
            overflow: 'auto',
          }}
          treeLine={{ showLine: true, showIcon: false }}
          listHeight={500}
          treeDefaultExpandAll
          treeData={data}
          placeholder="Listado de Propósitos, Programas y Conceptos"
          labelInValue
          onChange={onChange}
        />
      </Col>
      <Col span={24}>
        {value && value.value.length >= 7 && value.value.length < 9 ? (
          <TrendsViz selection={value.label} type={'program'} />
        ) : (
          ''
        )}
        {value && value.value.length >= 9 ? (
          <TrendsViz selection={value.label} type={'concept'} core={core} />
        ) : (
          ''
        )}
        {!value || ![7, 8, 9, 10].includes(value.value.length) ? (
          <div
            style={{
              height: '485px',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Empty
              description={
                'Selecciona un Programa o un Concepto para cargar la visualización'
              }
            />
          </div>
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
};

export default TrendsTreeSelect;
