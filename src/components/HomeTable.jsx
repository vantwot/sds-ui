import React from 'react';

/* UI Library Components */
import { Table } from 'antd';

const HomeTable = () => {
  const searchExamples = [
    {
      key: '0',
      search: 'Tema',
      example: (
        <div>
          Consulte a los autores, grupos e instituciones y su producción que
          investigan en un tema específico de salud desde Bogotá. Los términos
          de búsqueda están asociados a todas las categorías relativas en salud
          tomadas de OpenAlex que cuenta con más de 65000 categorías. Intente la
          búsqueda con su categoría de elección, sino diríjase al{' '}
          <a
            href="https://docs.google.com/spreadsheets/d/1LBFHjPt4rj_9r0t0TTAlT68NwOtNH8Z21lBMsJDMoZg/edit#gid=269244404"
            target="_blank"
            rel="noreferrer"
          >
            diccionario de conceptos de OpenAlex.
          </a>
        </div>
      ),
    },
    {
      key: '1',
      search: 'Producto',
      example:
        'Consulte los diferentes tipos de productos de un tema o palabra clave en publicaciones hechas por bogotanos (ej. "Validación del índice de Apgar Quirúrgico en una población colombiana").',
    },
    {
      key: '2',
      search: 'Institución',
      example:
        'Consulte los temas, grupos, autores, coautores y producción relacionada de una institución bogotana (ej. "Pontificia Universidad Javeriana").',
    },
    {
      key: '3',
      search: 'Grupo de investigación',
      example:
        'Consulte con el nombre completo de un grupo o alguna de las palabras de su nombre, los temas de trabajo, las publicaciones, citaciones, autores y coautores de un grupo de investigación bogotano (ej. "Grupo de Virología"). Los datos de codificación y nombre de los grupos son tomados de los datos abiertos de Minciencias disponibles en:',
    },
    {
      key: '4',
      search: 'Autor',
      example:
        'Consulte la producción de autores bogotanos, temas, coautorías, afiliaciones (ej. "Liliana Margarita Otero Mendoza")',
    },
  ];

  return (
    <Table dataSource={searchExamples} pagination={false} bordered size="small">
      <Table.Column title="Buscar por" dataIndex="search" />
      <Table.Column title="Descripción" dataIndex="example" />
    </Table>
  );
};

export default HomeTable;
