import React, { useState } from 'react';

/* Utilities */
import { useHistory } from 'react-router';

/* UI Components */
import { Select, Input } from 'antd';

const OPTIONS = [
  {
    label: 'Tema',
    value: 'subjects',
    key: 'subjects',
  },
  {
    label: 'Producto',
    value: 'literature',
    key: 'literature',
  },
  {
    label: 'Institución',
    value: 'institutions',
    key: 'institutions',
  },
  {
    label: 'Grupo',
    value: 'groups',
    key: 'groups',
  },
  {
    label: 'Autor',
    value: 'authors',
    key: 'authors',
  },
];

const SearchBar = ({ core }) => {
  const history = useHistory();
  const [selected, setSelected] = useState(OPTIONS[0]);

  window.addEventListener('popstate', () => {
    setTimeout(() => {
      core.setURL(history.location.pathname + history.location.search);
    }, 5);
  });

  const searchRequest = (input) => {
    history.push(
      `/app/search?data=${selected.value}`.concat(
        input ? `&keywords=${input}` : ''
      )
    );
    core.setURL(
      `/app/search?data=${selected.value}`.concat(
        input ? `&keywords=${input}` : ''
      )
    );
  };

  return (
    <Input.Search
      style={{ verticalAlign: 'middle', padding: '0 5px' }}
      addonBefore={
        <Select
          options={OPTIONS}
          labelInValue="true"
          defaultValue={OPTIONS[0]}
          onSelect={setSelected}
          dropdownMatchSelectWidth={100}
        />
      }
      placeholder={'Búsqueda por palabra clave'}
      onSearch={(input) => searchRequest(input)}
      enterButton
      size="large"
    />
  );
};

export default SearchBar;
