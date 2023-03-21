import React, { useEffect } from 'react';

/* Components */
import CompendiumTable from '../CompendiumTable';

/* UI Library Components */
import { Tabs, Typography } from 'antd';

/* Utilities */
import { APIRequest } from '../../apis/api';
import { useLocation } from 'react-router-dom';
import AuthorsTabOnCompendium from '../AuthorsTabOnCompendium';

/* UI Library Sub-components */
const { TabPane } = Tabs;
const { Title } = Typography;

const Compendium = ({ core }) => {
  const location = useLocation();
  let URL = location.pathname + location.search;
  const [state, setUrl] = APIRequest(URL);

  const secondary_color = { color: '#515152' };

  useEffect(() => {
    document.title = 'Capacidades científicas | SALUDATA';
  }, []);

  useEffect(() => {
    setUrl(URL);
    core.setFilters(state.data.filters);
    return () => {
      core.setFilters(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL, state]);

  return (
    <Tabs defaultActiveKey="authors" type="card" tabBarGutter={5}>
      <TabPane tab="Autores" key="authors">
        <Title style={secondary_color} level={5}>
          En esta sección podrá encontrar una descripción demográfica general
          del personal dedicado a la investigación en salud en Bogotá. Están
          discriminados por sexo, rango de edad, categoría Minciencias y nivel
          de escolaridad.
        </Title>
        <AuthorsTabOnCompendium />
      </TabPane>
      <TabPane tab="Grupos" key="groups">
        <Title style={secondary_color} level={5}>
          En esta sección podrá encontrar un listado de los grupos de
          investigación radicados en Bogotá o que desarrollan coautorías con
          grupos bogotanos y pueden ser organizados de mayor a menor, de acuerdo
          al número de artículos publicados o número total de citas recibidas.
          Cada grupo puede ser consultado por su filiación institucional, número
          de productos y citas, curva de producción y citación temporal y temas
          en los que trabaja.
        </Title>
        <CompendiumTable core={core} type="groups" />
      </TabPane>
      <TabPane tab="Instituciones" key="institutions">
        <Title style={secondary_color} level={5}>
          En esta sección podrá encontrar un listado de las instituciones que
          hacen investigación en salud en Bogotá o que tienen coautorías con
          instituciones bogotanas ordenadas de mayor a menor por número de
          artículos publicados o número total de citas recibidas. Cada
          institución puede ser consultada por su número de artículos, citas
          recibidas, curva de producción y citación temporal y temas en los que
          trabaja.
        </Title>
        <CompendiumTable core={core} type="institutions" />
      </TabPane>
      <TabPane tab="Temas" key="subjects">
        <Title style={secondary_color} level={5}>
          En esta sección podrá encontrar el listado de temas en los que
          publican artículos científicos el personal dedicado a investigación en
          Bogotá. Pueden ser ordenados por número de artículos publicados y
          número de citas obtenidas en estos temas. Cada tema puede ser
          consultado por las instituciones, los grupos y autores que han
          publicado sobre este y la curva temporal de producción del tema en
          Bogotá.
        </Title>
        <CompendiumTable core={core} type="subjects" />
      </TabPane>
    </Tabs>
  );
};

export default Compendium;
