import React from 'react';

/* Components */
import OpenAccessStatus from '../components/OpenAccessStatus';

const infoText = ({ type }) => {
  const text = {
    openAccess: (
      <div>
        Esta sección muestra el tipo de acceso de cada uno de los productos
        académicos.
        <br />
        <br />
        En la práctica, es posible el acceso abierto a través de diferentes
        rutas, por las cuales los públicos pueden acceder total o parcialmente a
        los sitios donde los investigadores y las organizaciones disponen los
        contenidos científicos. Las declaraciones fundacionales del AA, de
        inicios del siglo XXI, empezaron a considerar dos rutas, en la medida en
        que se iba consolidando el movimiento. La primera es la ruta verde <b>El sabia que el sabia</b>{' '}
        <OpenAccessStatus status={'green'} />
        que se refiere a la publicación en los repositorios, sean
        institucionales o temáticos.
        <br />
        <br />
        La segunda es la dorada <OpenAccessStatus status={'gold'} />
        que se refiere a la publicación en abierto en revistas científicas, y
        que originalmente no representaba costos (como ha sido el caso en
        América Latina). Sin embargo, los actores comerciales (industria
        editorial), han adaptado la Ruta Dorada con la aplicación de Costos para
        el Procesamiento de Artículos (APC, por sus siglas en inglés). El APC
        implica los autores (o sus instituciones) paguen los cargos
        correspondientes a la edición, publicación, distribución y demás costos
        que el publicador quiera incluir, y de esta forma el artículo queda de
        libre lectura.
        <br />
        <br />
        Derivado de esto, surge la ruta híbrida{' '}
        <OpenAccessStatus status={'hybrid'} />
        en la que las revistas manejan dos modelos: abierto o cerrado{' '}
        <OpenAccessStatus status={'closed'} />
        (por suscripción). El autor elige por cuál de los dos desea que se
        publique el documento, e implica el pago de APC, si se opta por el
        abierto.
        <br />
        <br />
        Otra alternativa que se ha desarrollado es la ruta bronce{' '}
        <OpenAccessStatus status={'bronze'} />
        la cual permite que las revistas ofrezcan el texto de sus artículos en
        abierto, pero solamente en el sitio web donde están alojados. Para la
        descarga o lectura fuera de línea es necesario pagar.
      </div>
    ),
    venn: (
      <div>
        La gráfica muestra las bases de datos donde es posible consultar la
        producción académica. Para saber más consulte la ficha técnica del
        indicador.
      </div>
    ),
    subjects: (
      <div>
        La nube de palabras muestra las temáticas de investigación de mayor y
        menor frecuencia en la producción académica. El tamaño de la palabra se
        relaciona con la cantidad de productos. Para saber más consulte la ficha
        técnica del indicador.
        <div>Haz click sobre un tema para ver información detallada</div>
      </div>
    ),
    citations: (
      <div>
        La gráfica muestra la cantidad de productos académicos citados por año.
        Para saber más consulte la ficha técnica del indicador.
      </div>
    ),
    citationsMap: (
      <div>
        En el mapa se observan los países donde han sido citados los productos
        académicos. Para saber más consulte la ficha técnica del indicador.
      </div>
    ),
    coauthorsMap: (
      <div>
        Esta sección permite visualizar los países con los que se han realizado
        uno o más productos académicos de manera colaborativa. Para saber más
        consulte la ficha técnica del indicador.
      </div>
    ),
    graph: (
      <div>
        La red muestra las co-autorías de cada investigador o investigadora con
        otros investigadores. La línea indica la relación entre autores y el
        tamaño del círculo indica la cantidad de productos en co-autoría. Para
        saber más consulte la ficha técnica del indicador.
      </div>
    ),
    columnLine: (
      <div>
        En el gráfico, las barras indican la cantidad de productos académicos
        por año. Para saber más consulte la ficha técnica del indicador.
      </div>
    ),
    compendiumSex: (
      <div>
        En la gráfica, se describe la distribución total de investigadores del
        área de la salud afiliados a instituciones bogotanas por sexo de acuerdo
        a la información disponible en la base de datos del Scienti de
        Minciencias.
      </div>
    ),
    compendiumAge: (
      <div>
        En la gráfica, se describe la distribución total de investigadores del
        área de la salud afiliados a instituciones bogotanas por grupo etáreo de
        acuerdo a la información disponible en la base de datos del Scienti de
        Minciencias.
      </div>
    ),
    compendiumCategory: (
      <div>
        En la gráfica, se describe la distribución total de investigadores del
        área de la salud afiliados a instituciones bogotanas por rango de
        clasificación de acuerdo a la información disponible en la base de datos
        del Scienti de Minciencias.
      </div>
    ),
    compendiumScholar: (
      <div>
        En la gráfica, se describe la distribución total de investigadores del
        área de la salud afiliados a instituciones bogotanas por nivel de
        escolaridad de acuerdo a la información disponible en la base de datos
        del Scienti de Minciencias.
      </div>
    ),
  };
  return (
    <div>
      {text[type]}
      <br />
      <a href={'/app/techdocs'} target="_blank" rel="noreferrer">
        Para saber más consulte aquí la ficha técnica del indicador.
      </a>
    </div>
  );
};

export default infoText;
