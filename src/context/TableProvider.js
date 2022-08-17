import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    const fetchTable = async () => {
      const require = await fetch(URL);
      const result = await require.json();
      setPlanets(result.results);
    };
    fetchTable();
  }, []);

  return (

    <myContext.Provider
      value={ {
        planets,
      } }
    >
      { children }
    </myContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
